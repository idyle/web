import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useUtil } from "../Context";

const Reset = () => {

    const navigate = useNavigate();
    const { setLoader, notify } = useUtil();
    const [email, setEmail] = useState('');

    const onEmailChange = (e) => setEmail(e.target.value);


    const onEmailClick = async () => {
        if (!email) return;
        try {
            setLoader(true);
            const test = await sendPasswordResetEmail(getAuth(), email);
            notify('email sent!', test);
            setLoader(false);
        } catch (e) {
            console.log(e);

        }
    };

    return (
        <div className="grid w-full justify-items-center gap-10">
        <div className="grid justify-items-center">
            <h1 className="text-3xl">Reset your Password</h1>
        </div>
        <div className="grid w-full gap-1">

                <input id="email" onChange={onEmailChange} className="rounded-lg p-2 border border-black outline-none placeholder:text-black text-xl w-full h-full" type="text" placeholder="Email Address" /> :


            <div onClick={onEmailClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg bg-black hover:scale-[.98]">
                <h1 className='text-2xl text-white font-semibold'>Continue</h1>
            </div>
            
        </div>

        <h1 className="text-xl">- Other Options -</h1>

        <div className="grid w-full gap-1">
            <div onClick={() => navigate('/login/login')} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border border-black hover:scale-[.98]">
                <h1 className='text-2xl text-black font-semibold'>Login to an Account</h1>
            </div>
            <div onClick={() => navigate('/login/register')} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border border-black hover:scale-[.98]">
                <h1 className='text-2xl text-black font-semibold'>Register an Account</h1>
            </div>
        </div>

    </div>
    )
};

export default Reset;