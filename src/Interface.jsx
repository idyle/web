import Navigator from './Navigator';
import Editor from './Editor/Editor';
import { Routes, Route } from 'react-router-dom'; 
import DND from './Editor/Design/Main';

const Interface = () => {
    return (
        <div className='grid grid-rows-[auto_1fr]'>
            <Navigator />
            {/* NA */}
            <Routes>
                <Route path ="editor" element={<Editor />} />
            </Routes>
        </div>
    )
};

export default Interface;