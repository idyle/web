import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from 'views/account/profile';
import Payments from 'views/account/payments';

const Account = () => {
    return (
        <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="payments" element={<Payments />} />
            <Route path="*" element={<Navigate to="profile" />} /> 
        </Routes>
    );
};

export default Account;