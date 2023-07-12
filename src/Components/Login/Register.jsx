import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useSignIn } from "./Login";
import { useUtil } from "../../Contexts/Util";
import { useNavigate } from "react-router-dom";
import Providers from "./Providers";
import { useAuth } from "../../Contexts/Auth";

const Register = () => {
    const [credentials, setCredentials] = useState({});
    const { transit, setTransit, handleDuplicateError } = useSignIn();
    const { resetUser } = useAuth();
    const { spin, notify } = useUtil();
    const navigate = useNavigate();

    const onChange = (e) => {
        credentials[`${e.target.id}`] = e.target.value;
        setCredentials({ ...credentials });
    };

    const verifyInfo = () => {

        let verdict = { success: false };

        for (const value of Object.values(credentials)) {
            if (!value) verdict.message = 'Please complete all fields.';
            
            else if (value.length > 50) verdict.message = 'Please limit entries to 50 characters.';
            else if (value.length < 5) verdict.message = 'Please make entries at least 5 characters.'
        }
        const { password = '', confirm = '' } = credentials;
        if (password !== confirm) verdict.message = 'Passwords do not match.';

        if (verdict.message) {
            notify(verdict.message);
            return false;
        }
        return true;
    };

    const onClick = async () => {
        if (transit) return;
        if (!verifyInfo()) return;
        try {
            setTransit(true);
            spin(true);
            const { email = '', password = '', name = '' } = credentials;
            const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
            await updateProfile(user, { displayName: name });
            resetUser();
            await sendEmailVerification(user);
            setTransit();
        } catch (e) {
            console.error(e);
            setTransit();
            if (e.code === 'auth/email-already-in-use') notify('This email has already been used.');
            else if (e.code === 'auth/weak-password') notify('This password is invalid.');
            else if (e.code === 'auth/invalid-email') notify('This email is invalid.');
            handleDuplicateError(e);
        }
    };


    return (
        <>
            <div className="grid justify-items-center">
                <h1 className="text-3xl text-center">Register your Account</h1>
                <h1 onClick={() => navigate('/login/login')} className="text-lg text-blue select-none">Have an Account? Login here</h1>
            </div>
            <div className="grid w-full gap-1">
                <input id="name" onChange={onChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-black text-xl w-full h-full" type="text" placeholder="Full Name" />
                <input id="email" onChange={onChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-black text-xl w-full h-full" type="text" placeholder="Email Address" />
                <input id="password" onChange={onChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-black text-xl w-full h-full" type="password" placeholder="Password" />
                <input id="confirm" onChange={onChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-black text-xl w-full h-full" type="password" placeholder="Confirm Password" />
                <h1 className="text-lg select-none">Password must be at least 5 characters</h1>
                <div onClick={onClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg bg-black hover:scale-[.98]">
                    <h1 className='text-2xl text-white'>Continue</h1>
                </div>
            </div>
            <div className="relative flex items-center w-full">
                <div className="flex-grow border-t-2 border-white"></div>
                <span className="flex-shrink px-3 text-white text-xl">Or</span>
                <div className="flex-grow border-t-2 border-white"></div>
            </div>
            <Providers layout="min" />
        </>
    )
};

export default Register;