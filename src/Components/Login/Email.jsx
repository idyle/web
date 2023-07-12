import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSignIn } from "./Login";
import { useUtil } from "../../Contexts/Util";
import { useNavigate } from "react-router-dom";
import Providers from './Providers';

const Email = () => {
    const [credentials, setCredentials] = useState({});
    const { transit, setTransit, handleDuplicateError } = useSignIn();
    const { spin, notify } = useUtil();
    const navigate = useNavigate();

    const onChange = (e) => {
        credentials[`${e.target.id}`] = e.target.value;
        setCredentials({ ...credentials });
    };

    const onClick = async () => {
        if (transit) return;
        try {
            setTransit(true);
            spin(true);
            const { email = '', password = '' } = credentials;
            await signInWithEmailAndPassword(getAuth(), email, password);
            setTransit();
        } catch (e) {
            setTransit();
            if (e.code === 'auth/invalid-email' || e.code === 'auth/wrong-password') {
                notify('Your email or password is invalid.');
            } else if (e.code === 'auth/user-not-found') notify('This account does not exist');
            handleDuplicateError(e);
        }
    };


    return (
        <>
            <div className="grid justify-items-center">
                <h1 className="text-3xl text-center">Sign in to your Account</h1>
                <h1 onClick={() => navigate('/login/register')} className="text-lg text-blue select-none">No Account? Register here</h1>
            </div>
            <div className="grid w-full gap-1">
                <input id="email" onChange={onChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-black text-xl w-full h-full" type="text" placeholder="Email Address" />
                <input id="password" onChange={onChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-black text-xl w-full h-full" type="password" placeholder="Password" />
                <h1 onClick={() => navigate('/login/reset')} className="text-lg select-none text-blue">Forgot Password?</h1>
                <div onClick={onClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border-2 rounded-lg hover:scale-[.98]">
                    <h1 className='text-2xl text-white'>Continue</h1>
                </div>
            </div>
            <div className="relative flex items-center w-full">
                <div className="flex-grow border-t-2 border-white"></div>
                <span className="flex-shrink px-3 text-white text-xl">Or</span>
                <div className="flex-grow border-t-2 border-white"></div>
            </div>
            <Providers />
        </>
    )
};

export default Email;