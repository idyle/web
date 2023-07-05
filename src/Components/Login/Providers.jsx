import { useEffect } from "react";
import { getAuth, signInWithRedirect, getRedirectResult, fetchSignInMethodsForEmail, linkWithCredential, linkWithRedirect } from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';
import Provider from './Provider';
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { useUtil } from "../../Contexts/Util";
import { useSignIn } from "./Login";
import Minprovider from "./Minprovider";

const Providers = ({ layout = 'default' }) => {

    const { spin, notify } = useUtil();
    const { transit, setTransit, linkage, setLinkage, handleDuplicateError } = useSignIn();

    useEffect(() => {
        (async () => {
            try {
                const result = await getRedirectResult(getAuth());
                if (linkage) {
                    const e = JSON.parse(linkage);
                    const credential = OAuthProvider.credentialFromError(e);
                    const t = await linkWithCredential(result.user, credential);
                    notify("We've linked your accounts");
                    setLinkage();
                }
                // we need to use credential linkage
                setTransit();
            } catch (e) {
                console.error(e);
                setTransit();
                if (e.code === 'auth/account-exists-with-different-credential') {
                    notify("You're using another providr")
                    const providers = await fetchSignInMethodsForEmail(getAuth(), e?.customData?.email);
                    const provider = providers.find(p => p === 'google.com' || p === 'facebook.com' || p === 'github.com');
                    if (!provider) return notify('Youre using another provider');
                    let serviceProvider;
                    if (provider === 'google.com') serviceProvider = new GoogleAuthProvider();
                    else if (provider === 'facebook.com') serviceProvider = new FacebookAuthProvider();
                    else if (provider === 'github.com') serviceProvider = new GithubAuthProvider();
                    else return notify('ANothe rprovider being used;')
                    // lets get the credential
                    
                    setLinkage(JSON.stringify(e));
                    spin(true);
                    setTransit(true);
                    await signInWithRedirect(getAuth(), serviceProvider);
                }
            }
        })();
    }, []);

    const continueWith = async (provider) => {
        if (transit) return;
        // call the loader and mark the progress as true
        spin(true);
        setTransit(true);
        await signInWithRedirect(getAuth(), provider);
        // the result is handled separately
    };

    const continueWithGoogle = () => continueWith(new GoogleAuthProvider());
    const continueWithGithub = () => continueWith(new GithubAuthProvider());
    const continueWithFacebook = () => continueWith(new FacebookAuthProvider());
    
    return (
        <>
            {
                layout === 'default' ?
                <div className={`grid w-full gap-1`}>        
                    <Provider icon={<FaGoogle />} text="Continue with Google" onClick={continueWithGoogle} />
                    <Provider icon={<FaFacebook />} text="Continue with Facebook" onClick={continueWithFacebook} />
                    <Provider icon={<FaGithub />} text="Continue with Github" onClick={continueWithGithub} />
                </div> :
                <div className="grid w-full grid-cols-3 gap-1">
                    <Minprovider icon={<FaGoogle />} onClick={continueWithGoogle} />
                    <Minprovider icon={<FaFacebook />} onClick={continueWithFacebook} />
                    <Minprovider icon={<FaGithub />} onClick={continueWithGithub} />
                </div>

            }
        </>
    )
};

export default Providers;