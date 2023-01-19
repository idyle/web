import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Reset from './Reset';
import Confirm from './Confirm';
import { useNavigate } from "react-router-dom";

const Actions = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState('resetPassword');
    const [code, setCode] = useState();

    useEffect(() => {
        const code = searchParams?.get('oobCode');
        const mode = searchParams?.get('mode');
        if (mode) setMode(mode);
        if (code) setCode(code);
    }, [searchParams])
    
    return (
        <div className="grid justify-items-center items-center h-full w-full">
        <div className="grid h-[90%] w-[400px] my-10 p-6 gap-4 auto-rows-min justify-items-center border bg-black rounded-xl shadow-xl overflow-auto">
            <div className="grid gap-7 items-center justify-items-center">
                <h1 className="text-6xl text-white">idyle</h1>
            </div>
            { mode === 'resetPassword' ? <Reset code={code} /> : <Confirm code={code} /> }
            <h1 className="text-xl text-white">- Other Options -</h1>

<div className="grid w-full gap-1">
<div onClick={() => navigate('/')} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border border-white hover:scale-[.98]">
        <h1 className='text-2xl text-white font-semibold'>Go to Home</h1>
    </div>
    <div onClick={() => navigate('/login/login')} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border border-white hover:scale-[.98]">
        <h1 className='text-2xl text-white font-semibold'>Login to an Account</h1>
    </div>
    <div onClick={() => navigate('/login/register')} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border border-white hover:scale-[.98]">
        <h1 className='text-2xl text-white font-semibold'>Register an Account</h1>
    </div>
</div>

        </div>
        </div>
    )
};

export default Actions;