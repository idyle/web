import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSignIn } from "./Login";
import { useUtil } from "../../Contexts/Util";
import { useNavigate } from "react-router-dom";
import Providers from './Providers';

const Email = () => {
    const [credentials, setCredentials] = useState({});
    const { transit, setTransit, handleDuplicateError } = useSignIn();
    const { load, notify } = useUtil();
    const navigate = useNavigate();

    const onChange = (e) => {
        credentials[`${e.target.id}`] = e.target.value;
        console.log('new credentials', { ...credentials });
        setCredentials({ ...credentials });
    };

    const onClick = async () => {
        if (transit) return;
        try {
            setTransit(true);
            load(true);
            const { email = '', password = '' } = credentials;
            console.log('email pass', email, password);
            const test = await signInWithEmailAndPassword(getAuth(), email, password);
            console.log('test', test);
            setTransit();
        } catch (e) {
            setTransit();
            console.log(e);
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
                <h1 onClick={() => navigate('/login/register')} className="text-lg underline select-none">No Account? Register here</h1>
            </div>
            <div className="grid w-full gap-1">
                <input id="email" onChange={onChange} className="rounded-lg p-2 border border-black outline-none placeholder:text-black text-xl w-full h-full" type="text" placeholder="Email Address" />
                <input id="password" onChange={onChange} className="rounded-lg p-2 border border-black outline-none placeholder:text-black text-xl w-full h-full" type="password" placeholder="Password" />
                <h1 onClick={() => navigate('/login/reset')} className="text-lg underline select-none">Forgot Password?</h1>
                <div onClick={onClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg bg-black hover:scale-[.98]">
                    <h1 className='text-2xl text-white font-semibold'>Continue</h1>
                </div>
            </div>
            <h1 className="text-xl"> - OR -</h1>
            <Providers />
        </>
    )
};

export default Email;