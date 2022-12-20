import Subnavbutton from "../Templates/Subnavbutton";
import { AiOutlineUser } from 'react-icons/ai';
import Profile from './Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";

const Accounts = () => {

    useEffect(() => {
        document.title = 'Accounts';
    }, []);
    return (
        <div className="grid grid-cols-[20%_80%] m-2">
            <div className="grid auto-rows-min border border-black p-4 gap-6 shadow-inner rounded-lg m-1 bg-black">
                <Subnavbutton text="Profile" icon={<AiOutlineUser />} route="/accounts/profile" />
            </div> 
            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="profile" />} /> 
            </Routes>
        </div>
    )
};

export default Accounts;