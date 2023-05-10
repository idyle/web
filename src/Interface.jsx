import Navigator from './Navigator/Navigator';
import Editor from './Editor/Editor';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Accounts from './Accounts/Accounts';
import Home from './Home/Home';
import Payments from './Payments/Payments';
import Documents from './Documents/Documents';
import Objects from './Objects/Objects';
import Deployer from './Deployer/Deployer';

const Interface = () => {
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