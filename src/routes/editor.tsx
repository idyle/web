import { Routes, Route, Navigate } from 'react-router-dom';
import Pages from 'views/editor/pages';
import Canvas from 'views/editor/canvas';
import Codebase from 'views/editor/codebase';

const Editor = () => {
    return (
        <Routes>
            <Route path="pages" element={<Pages />} />
            <Route path="canvas" element={<Canvas />} />
            <Route path="codebase" element={<Codebase />} />
            <Route path="*" element={<Navigate to="pages" />} /> 
        </Routes>
    );
};

export default Editor;