import { useState } from "react";
import { getAuth, confirmPasswordReset, verifyPasswordResetCode, signInWithEmailAndPassword} from "firebase/auth";
import { useUtil } from "../../Contexts/Util";
import { useNavigate } from "react-router-dom";

const Reset = ({ code }) => {

    const navigate = useNavigate();
    const { load, notify } = useUtil();
    const [password, setPassword] = useState('');

    const onPasswordChange = (e) => setPassword(e.target.value);

    const onPasswordClick = async () => {
        const verifiedEmail = await verifyPasswordResetCode(getAuth(), code);
        if (!code || !password || !verifiedEmail) return;
        try {
            load(true);
            const test = await confirmPasswordReset(getAuth(), code, password);
            await signInWithEmailAndPassword(getAuth(), verifiedEmail, password);
            navigate('/');
            notify('password changed!');
            load(false);
        } catch (e) {
            if (e.code === 'auth/invalid-action-code') notify('This session is invalid.');
            else notify('an error occured');
            load(false);
            console.error(e);
        }
    };

    return (
        <div className="grid w-full justify-items-center gap-10">
            <div className="grid justify-items-center">
                <h1 className="text-3xl text-white">Reset your Password</h1>
            </div>
            <div className="grid w-full gap-1">
                <input id="password" onChange={onPasswordChange} className="rounded-lg p-2 border border-white outline-none placeholder:text-white text-xl w-full h-full bg-black text-white" type="password" placeholder="New Password" />
                <div onClick={onPasswordClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border border-white rounded-lg hover:scale-[.98]">
                    <h1 className='text-2xl text-white font-semibold'>Continue</h1>
                </div>
            </div>
        </div>
    )
};

export default Reset;