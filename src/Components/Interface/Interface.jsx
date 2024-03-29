import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom'; 
import Navigator from './Navigator/Navigator';
import Editor from './Editor/Editor';
import Accounts from './Accounts/Accounts';
import Home from './Home/Home';

import Documents from './Documents/Documents';
import Objects from './Objects/Objects';
import Deployer from './Deployer/Deployer';
import { useEffect } from 'react';
import { useAuth } from '../../Contexts/Auth';
import { useUtil } from '../../Contexts/Util';

const Interface = () => {

    const { user, auth } = useAuth();
    const { notify, inform, loading } = useUtil();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (loading || !user || user?.planType || searchParams?.get('session')) return;
        (async () => {
                await inform("You don't have a plan yet!", "Select a plan to get started.");
                navigate('/accounts/payments');
                return notify('Browse through our amazing plans and select the one best for you.', 5000);   
            }
        )();
    }, [user, searchParams, loading]);

    if (auth) return (
        <div className='grid h-full grid-rows-[auto_minmax(0,_1fr)] overflow-auto'>
            <Navigator />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="editor/*" element={<Editor />} />
                <Route path="accounts/*" element={<Accounts />} />

                <Route path="docs" element={<Documents />} />
                <Route path="objects" element={<Objects />} />
                <Route path="deployer/*" element={<Deployer />} />
                <Route path="*" element={<Navigate to="" />} />
            </Routes>
        </div>
    )
    else return (<Navigate to="login"/>)
};

export default Interface;