import { useAuth } from "../../../../Contexts/Auth";
import { useUtil } from "../../../../Contexts/Util";
import { useData } from "../../../../Contexts/Data";
import { BsPersonCircle, BsArrowClockwise, BsCheckAll } from 'react-icons/bs';
import { MdEmail, MdHelp } from 'react-icons/md';
import { createSession } from "../requests";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const { user, getToken } = useAuth();
    const { notify, load } = useUtil();
    const { resetData } = useData();
    const navigate = useNavigate();

    const onSignOut = () => {
        signOut(getAuth());
        resetData();
    };

    const copyToClip = async () => {
        load(true);
        const token = await getToken();
        const session = await createSession(token);
        load(false);
        if (!session) return;
        navigator.clipboard.writeText(session);
        notify('Copied your session token. This is valid for fourteen (14) days.');
    };

    const goToSupport = () => window.open(`https://support.idyle.app`, '_blank');
    const goToAPI = () => window.open(`https://github.com/idyle/api`, '_blank');
    const resetPassword = () => navigate('/actions?mode=resetPassword');

    return (
        <div className="grid auto-rows-min w-full gap-5 p-2 lg:px-28">

            <div className="grid items-center grid-flow-col justify-between">
                <div className="flex items-center gap-x-4">
                    {user?.picture ? <img className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full" src={user?.picture} /> : <BsPersonCircle size="80px" />}
                    <div className="grid">
                        <h1 className="text-4xl md:text-5xl">{user?.name}</h1>
                        <h1 className="text-lg md:text-2xl">{user?.email}</h1>
                    </div>
                </div>
                <div onClick={resetPassword} className="grid auto-rows-min rounded-full border-2 border-gunmetal p-2 hover:bg-black/20">
                    <BsArrowClockwise className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]" />
                </div>
            </div>

            <div className="grid p-3 text-gunmetal border-2 border-gunmetal rounded-xl gap-3">
                <h1 className="text-5xl font-bold">Your Information</h1>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl">User ID</h1>
                    <h1 className="text-xl md:text-3xl break-all">{user?.sub}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl">User Provider</h1>
                    <h1 className="text-xl md:text-3xl">{user?.signInProvider}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl">Recent Login</h1>
                    <h1 className="text-xl md:text-3xl">{new Date(user?.authTime)?.toLocaleString('en-us')}</h1>
                </div>
                
            </div>

            { user?.email_verified ? <div className="flex place-content-center items-center bg-gunmetal text-white p-3 gap-2 rounded-lg select-none">
                <BsCheckAll size="30px" />
                <h1 className="text-3xl text-center">You're fully verified!</h1>                    
            </div> : <div className="flex place-content-center items-center bg-gunmetal text-white p-3 gap-2 rounded-lg select-none">
                <MdEmail size="30px" />
                <h1 className="text-3xl text-center">Verify your Email Address</h1>                    
            </div> }

            <div className="grid p-3 text-gunmetal border-2 border-gunmetal rounded-xl gap-3">
                <h1 className="text-5xl font-bold">Security & Tools</h1>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl">Development</h1>
                    <div onClick={goToAPI} className="flex bg-gunmetal text-white p-2 rounded-lg hover:scale-[.98] select-none">
                        <h1 className="text-xl">Visit API</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl">Session Token</h1>
                    <div onClick={copyToClip} className="flex bg-gunmetal text-white p-2 rounded-lg hover:scale-[.98] select-none">
                        <h1 className="text-xl">Get Token</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl">User Session</h1>
                    <div onClick={onSignOut} className="flex bg-gunmetal text-white p-2 rounded-lg hover:scale-[.98] select-none">
                        <h1 className="text-xl">Sign out</h1>
                    </div>
                </div>
            </div>

            <div onClick={goToSupport} className="flex place-content-center items-center bg-gunmetal text-white p-3 gap-2 rounded-lg hover:scale-[.99] select-none">
                <MdHelp size="30px" />
                <h1 className="text-2xl md:text-3xl text-center">Have questions? Contact us.</h1>                    
            </div>

        </div>
    )
};

export default Profile;