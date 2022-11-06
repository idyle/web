import { useEffect, useState } from "react";
import { signInWithRedirect, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useAuth, useUtil } from "./Context";

const Login = () => {

    const { auth } = useAuth();
    const { setLoader, setNotifier } = useUtil();
    const [inProgress] = useState(localStorage.getItem('inProgress'));

    useEffect(() => {
        if (inProgress) {
            setLoader(true);
        }
        if (inProgress && auth) localStorage.removeItem('inProgress');
    }, [inProgress, auth]);

    const signIn = async () => {
        if (inProgress) return;
        setLoader(true);
        localStorage.setItem('inProgress', 'true');
        await signInWithRedirect(getAuth(), new GoogleAuthProvider());
    };

    return (
        <div className="flex h-[90%] items-center content-center justify-center place-content-center">
        <div onClick={signIn} className="flex cursor-pointer select-none border rounded-lg border-black place-content-center">
            <div className="flex p-3 gap-2 items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                <h1 className='text-2xl text-black font-semibold'>Sign in with Google</h1>
            </div>
        </div>
        </div>

    )
};

export default Login;