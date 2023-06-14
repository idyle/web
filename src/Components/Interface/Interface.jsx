import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import Navigator from './Navigator/Navigator';
import Editor from './Editor/Editor';
import Accounts from './Accounts/Accounts';
import Home from './Home/Home';
import Payments from './Payments/Payments';
import Documents from './Documents/Documents';
import Objects from './Objects/Objects';
import Deployer from './Deployer/Deployer';
import { useEffect } from 'react';
import { useAuth } from '../../Contexts/Auth';
import { useUtil } from '../../Contexts/Util';

const Interface = () => {

    const { user } = useAuth();
    const { notify, inform } = useUtil();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        (
            async () => {
                if (!user?.planType) {
                    await inform("You don't have a plan yet!", "Select a plan to get started.");
                    navigate('/payments');
                    return notify('Browse through our amazing plans and select the one best for you.');
                } 
            }
        )();
    }, [user]);

    return (
        <div className='grid h-full grid-rows-[auto_minmax(0,_1fr)]'>
            <Navigator />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="editor/*" element={<Editor />} />
                <Route path="accounts/*" element={<Accounts />} />
                <Route path="payments" element={<Payments />} />
                <Route path="docs" element={<Documents />} />
                <Route path="objects" element={<Objects />} />
                <Route path="deployer/*" element={<Deployer />} />
                <Route path="*" element={<Navigate to="" />} />
            </Routes>
        </div>
    )
};

export default Interface;