import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Login from './Login';
import Interface from './Interface';
import { NavContext, AuthContext, UtilContext } from './Context';
import { Routes, Route } from 'react-router-dom'; 

const App = () => {
    return (
        <NavContext>
            <UtilContext>
                <AuthContext>
                    <div className='h-screen grid grid-rows-[5%_95%]'>
                        {/* 10% */}
                    <Loader />
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path ="*" element={<Interface />} />
                    </Routes>
                    <Notifier />
                    </div>

                </AuthContext>
            </UtilContext>
        </NavContext>
    )
};

export default App;