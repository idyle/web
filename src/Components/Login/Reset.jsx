import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useUtil } from "../../Contexts/Util";

const Reset = () => {

    const navigate = useNavigate();
    const { spin, notify } = useUtil();
    const [email, setEmail] = useState('');

    const onEmailChange = (e) => setEmail(e.target.value);


    const onEmailClick = async () => {
        if (!email) return;
        try {
            spin(true);
            await sendPasswordResetEmail(getAuth(), email);
            notify("We've sent an email to this address.");
            spin(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="grid w-full justify-items-center gap-10">
            <div className="grid justify-items-center">
                <h1 className="text-3xl">Reset your Password</h1>
            </div>
            <div className="grid w-full gap-1">
                <input id="email" onChange={onEmailChange} className="bg-white rounded-lg p-2 outline-none placeholder:text-black text-xl w-full h-full" type="text" placeholder="Email Address" /> 
                <div onClick={onEmailClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border-2 rounded-lg bg-black hover:scale-[.98]">
                    <h1 className='text-2xl text-white'>Continue</h1>
                </div>
            </div>
            <div className="relative flex items-center w-full">
                <div className="flex-grow border-t-2 border-white"></div>
                <span className="flex-shrink px-3 text-white text-xl">Other Options</span>
                <div className="flex-grow border-t-2 border-white"></div>
            </div>
            <div className="grid w-full gap-1">
                <div onClick={() => navigate('/login/login')} className="grid p-2 items-center justify-items-center cursor-pointer select-none rounded-lg border-2 border-gunmetal hover:scale-[.98]">
                    <h1 className='text-2xl text-inherit'>Login to an Account</h1>
                </div>
                <div onClick={() => navigate('/login/register')} className="grid p-2 items-center justify-items-center cursor-pointer select-none rounded-lg border-2 border-gunmetal hover:scale-[.98]">
                    <h1 className='text-2xl text-inherit'>Register an Account</h1>
                </div>
            </div>
        </div>
    )
};

export default Reset;