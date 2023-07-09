import { useEffect } from "react";
import { getAuth, signInWithRedirect, getRedirectResult, fetchSignInMethodsForEmail, linkWithCredential } from 'firebase/auth';
import { GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';
import Provider from './Provider';
import { FaTwitter, FaGoogle, FaGithub } from "react-icons/fa";
import { useUtil } from "../../Contexts/Util";
import { useSignIn } from "./Login";
import Minprovider from "./Minprovider";

const Providers = ({ layout = 'default' }) => {

    const { spin, notify } = useUtil();
    const { transit, setTransit, linkage, setLinkage } = useSignIn();

    useEffect(() => {
        (async () => {
            try {
                const result = await getRedirectResult(getAuth());
                if (linkage) {
                    const e = JSON.parse(linkage);
                    const credential = OAuthProvider.credentialFromError(e);
                    await linkWithCredential(result.user, credential);
                    notify("We've linked your accounts!");
                    setLinkage();
                }
                // we need to use credential linkage
                setTransit();
            } catch (e) {
                console.error(e);
                setTransit();
                if (e.code === 'auth/account-exists-with-different-credential') {
                    notify("You're using another provider. Redirecting you to your original provider to sign in.");
                    const providers = await fetchSignInMethodsForEmail(getAuth(), e?.customData?.email);
                    const provider = providers.find(p => p === 'google.com' || p === 'twitter.com' || p === 'github.com');
                    if (!provider) return notify('Youre using another provider');
                    let serviceProvider;
                    if (provider === 'google.com') serviceProvider = new GoogleAuthProvider();
                    else if (provider === 'twitter.com') serviceProvider = new TwitterAuthProvider();
                    else if (provider === 'github.com') serviceProvider = new GithubAuthProvider();
                    else return notify("You're using a legacy or unknown provider. Please sign in with another account or contact support.");
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
    const continueWithTwitter = () => continueWith(new TwitterAuthProvider());
    
    return (
        <>
            {
                layout === 'default' ?
                <div className={`grid w-full gap-1`}>        
                    <Provider icon={<FaGoogle />} text="Continue with Google" onClick={continueWithGoogle} />
                    <Provider icon={<FaTwitter />} text="Continue with Twitter" onClick={continueWithTwitter} />
                    <Provider icon={<FaGithub />} text="Continue with Github" onClick={continueWithGithub} />
                </div> :
                <div className="grid w-full grid-cols-3 gap-1">
                    <Minprovider icon={<FaGoogle />} onClick={continueWithGoogle} />
                    <Minprovider icon={<FaTwitter />} onClick={continueWithTwitter} />
                    <Minprovider icon={<FaGithub />} onClick={continueWithGithub} />
                </div>

            }
        </>
    )
};

export default Providers;