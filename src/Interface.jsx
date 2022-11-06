import Navigator from './Navigator';
import Editor from './Editor/Editor';
import { Routes, Route } from 'react-router-dom'; 
import DND from './Editor/Drag and Drop/Main';

const Interface = () => {
    return (
        <div>
            <Navigator />
            <Routes>
                <Route path ="editor" element={<Editor />} />
            </Routes>
        </div>
    )
};

export default Interface;