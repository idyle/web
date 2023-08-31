import Subnavbutton from "../Navigator/Subnav/Subnavbutton";
import { AiOutlineUser, AiOutlineCreditCard } from 'react-icons/ai';
import Profile from './Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import Subnav from "../Navigator/Subnav/Subnav";
import { Helmet } from "react-helmet";
import Payments from './Payments/Payments';

const Accounts = () => {
    return (
        <div className="grid auto-rows-min md:auto-rows-auto md:grid-cols-[15%_85%] m-3">
            <Helmet>
                <title>idyle - Accounts</title>
                <meta name="description" content="Accounts" />
                <meta name="keywords" content="Accounts" />
                <link rel="canonical" href="/accounts" />
            </Helmet>

            <Subnav type="side">
                <Subnavbutton text="Profile" icon={<AiOutlineUser />} route="/accounts/profile" />
                <Subnavbutton text="Payments" icon={<AiOutlineCreditCard />} route="/accounts/payments" />
            </Subnav>

            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="payments" element={<Payments />} />
                <Route path="*" element={<Navigate to="profile" />} /> 
            </Routes>
        </div>
    )
};

export default Accounts;

