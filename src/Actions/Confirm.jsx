import { applyActionCode, getAuth } from "firebase/auth";
import { useUtil } from "../Context";
import { useNavigate } from "react-router-dom";

const Confirm = ({ code }) => {

    const navigate = useNavigate();

    const { setLoader, setNotifier } = useUtil();

    const onClick = async () => {
        try {
            if (!code) return;
            setLoader(true);
            await applyActionCode(getAuth(), code);
            navigate('/login/login');
            setLoader(false);
            setNotifier('You have been successfully verified');
        } catch (e) {
            console.error(e);
            setLoader(false);
            setNotifier('Something went wrong in the verification.');
        }
    };
    
    return (
        <div className="grid w-full justify-items-center gap-10">
            <div className="grid justify-items-center">
                <h1 className="text-3xl text-white">Verify your Email</h1>
            </div>
            <div className="grid w-full gap-1">
                <div onClick={onClick} className="grid p-2 items-center justify-items-center cursor-pointer select-none border border-white rounded-lg hover:scale-[.98]">
                    <h1 className='text-2xl text-white font-semibold'>Continue</h1>
                </div>
            </div>
        </div>
    )

};

export default Confirm;