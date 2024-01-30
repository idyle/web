import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'views/auth/login';
import Register from 'views/auth/register';
import Reset from 'views/auth/reset';
import Verify from 'views/auth/verify';

const Auth = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<Reset />} />
            <Route path="verify" element={<Verify />} />
            <Route path="*" element={<Navigate to="login" />} /> 
        </Routes>
    );
};

export default Auth;