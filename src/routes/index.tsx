import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'views/home';
import Account from 'routes/account';
import Auth from 'routes/auth';
import Deployer from 'routes/deployer';
import Editor from 'routes/editor';
import Storage from 'routes/storage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="auth/*" element={<Auth />} />
            <Route path="account/*" element={<Account />} />
            <Route path="deployer/*" element={<Deployer />} />
            <Route path="editor/*" element={<Editor />} />
            <Route path="storage/*" element={<Storage />} />
            <Route path="*" element={<Navigate to="" />} /> 
        </Routes>
    );
};

export default AppRouter;