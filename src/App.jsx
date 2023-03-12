import Notifier from './Utilities/Notifier';
import Loader from './Utilities/Loader';
import Login from './Login/Login';
import Interface from './Interface';
import Actions from './Actions/Actions';
import { NavContext, AuthContext, UtilContext } from './Context';
import { Routes, Route } from 'react-router-dom'; 

const App = () => {
    return (
        <NavContext>
            <UtilContext>
                <AuthContext>
                    <div className='h-screen grid grid-rows-[auto_minmax(0,_1fr)]'>
                    <Loader />
                    <Routes>
                        <Route path="login/*" element={<Login />} />
                        <Route path="actions" element={<Actions />} />
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