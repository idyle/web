import { Routes, Route, Navigate } from 'react-router-dom';
import Staging from 'views/deployer/staging';
import Config from 'views/deployer/config';

const Deployer = () => {
    return (
        <Routes>
            <Route path="staging" element={<Staging />} />
            <Route path="config" element={<Config />} />
            <Route path="*" element={<Navigate to="staging" />} /> 
        </Routes>
    );
};

export default Deployer;