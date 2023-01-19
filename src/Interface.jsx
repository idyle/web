import Navigator from './Navigator/Navigator';
import Editor from './Editor/Editor';
import { Routes, Route } from 'react-router-dom'; 
import Accounts from './Accounts/Accounts';
import Error from './Error';
import Home from './Home';
import Payments from './Payments';

const Interface = () => {
    return (
        <div className='grid h-full grid-rows-[auto_minmax(0,_1fr)]'>
            <Navigator />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="editor/*" element={<Editor />} />
                <Route path="accounts/*" element={<Accounts />} />
                <Route path="payments" element={<Payments />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    )
};

export default Interface;