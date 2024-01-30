import { Routes, Route, Navigate } from 'react-router-dom';
import Files from 'views/storage/files';
import Records from 'views/storage/records';

const Storage = () => {
    return (
        <Routes>
            <Route path="files" element={<Files />} />
            <Route path="records" element={<Records />} />
            <Route path="*" element={<Navigate to="files" />} /> 
        </Routes>
    );
};

export default Storage;