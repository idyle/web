import Subnavbutton from "../Templates/Subnavbutton";
import { AiOutlineUser } from 'react-icons/ai';
import Profile from './Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import Subnav from "../Templates/Subnav";

const Accounts = () => {

    useEffect(() => {
        document.title = 'Accounts - idyle';
    }, []);


    return (
        <div className="grid grid-cols-[20%_80%] m-2">
            <Subnav type="side">
                <Subnavbutton text="Profile" icon={<AiOutlineUser />} route="/accounts/profile" />
            </Subnav>

            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="profile" />} /> 
            </Routes>
        </div>


    )
};

export default Accounts;

