import Login from "./Login/Login";
import Actions from "./Actions/Actions";
import Interface from "./Interface/Interface";
import { Routes, Route } from 'react-router-dom';

const Components = () => {
    return (

            <Routes>
                    <Route path="login/*" element={<Login />} />
                    <Route path="actions" element={<Actions />} />
                    <Route path ="*" element={<Interface />} />
            </Routes>

    )
};

export default Components;