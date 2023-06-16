import Subnavbutton from "../Templates/Subnavbutton";
import { AiOutlineUser } from 'react-icons/ai';
import Profile from './Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import Subnav from "../Templates/Subnav";
import { Helmet } from "react-helmet";

const Accounts = () => {
    return (
        <div className="grid auto-rows-min md:auto-rows-auto md:grid-cols-[15%_85%] m-2">
            <Helmet>
                <title>idyle - Accounts</title>
                <meta name="description" content="Accounts" />
                <meta name="keywords" content="Accounts" />
                <link rel="canonical" href="/accounts" />
            </Helmet>

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

