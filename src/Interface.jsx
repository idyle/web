import Navigator from './Navigator';
import Editor from './Editor/Editor';
import { Routes, Route } from 'react-router-dom'; 
import Accounts from './Accounts/Accounts';

const Interface = () => {
    return (
        <div className='grid h-full grid-rows-[auto_minmax(0,_1fr)]'>
            <Navigator />
            {/* NA */}
            <Routes>
                <Route path ="editor/*" element={<Editor />} />
                <Route path="/accounts/*" element={<Accounts />} />
            </Routes>
        </div>
    )
};

export default Interface;