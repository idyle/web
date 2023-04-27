import { useAuth } from "../../Contexts/Auth";
import { useUtil } from "../../Contexts/Util";
import { MdEdit, MdCheck } from 'react-icons/md';
import { getAuth, signOut } from 'firebase/auth';
import Infotable from './Infotable';
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { BsPersonCircle } from 'react-icons/bs';

const Profile = () => {
    const { user } = useAuth();
    const { notify } = useUtil();
    const onSignOut = () => signOut(getAuth());

    const copyToClip = () => {
        notify('Successfully copied to clipboard');
        navigator.clipboard.writeText(user?.accessToken);
        
    };

    const [info, setInfo] = useState([]);

    useEffect(() => {
        let date = new Date(user?.metadata?.creationTime)?.toLocaleString('en-us');
        const info = [
            { title: 'User ID', text: user?.uid },
            { title: 'Account Provider', text: user?.providerData?.[0]?.providerId },
            { title: 'User Since', text: date }
        ];
        setInfo(info);
        setName(user?.displayName)
    }, [user]);

    const [edit, setEdit] = useState(false);

    const [name, setName] = useState();

    const onNameChange = async (e) => {
        setName(e.target.value);
    };

    const saveInfo = async () => {
        if (name === user?.displayName) return;
        await updateProfile(user, { displayName: name });
    };

    return (
        <div className="grid auto-rows-min gap-1 p-2 m-1 shadow-xl rounded-lg overflow-auto">
            <div className="flex items-center p-2">
                <h1 className="text-6xl">Your Account</h1>
            </div>

            <div className="grid items-center justify-items-center border border-black p-2 rounded-lg">
                {user?.photoURL ? <img className="w-[80px] h-[80px] rounded-full" src={user?.photoURL} /> : <BsPersonCircle size="80px" />}
                {edit ? <input autoFocus className="text-center text-3xl w-1/2" onChange={onNameChange} value={name}/> : <h1 className="text-3xl">{name}</h1>}
                <h1 className="text-3xl font-thin">{user?.email}</h1>
                <div className="justify-self-end" onClick={() => setEdit(!edit)}>
                    {edit ? <MdCheck onClick={saveInfo} size="25px" /> : <MdEdit size="25px" />}
                </div>
            </div>
        
            <Infotable info={info} />

            <div className="grid p-3 gap-2">
                <h1 className="text-4xl">Developer Tools</h1>
                <div className="flex items-center gap-[20px] border border-black rounded-lg p-2">
                    <h1 className="text-2xl font-black select-none">Access Token</h1>
                    <div onClick={copyToClip} className="flex place-content-center bg-black p-0.5 w-1/4 rounded-lg select-none hover:scale-[.98]">
                        <h1 className="text-md text-white">Get Token</h1>
                    </div>
                </div>
            </div>

            <div onClick={onSignOut} className="flex items-center place-content-center bg-black w-1/4 rounded-lg p-2 select-none hover:scale-[.98]">
                <h1 className="text-2xl text-white">Sign Out</h1>
            </div>

        </div>
    )
};

export default Profile;