import Login from "./Login/Login";
import Actions from "./Actions/Actions";
import Interface from "./Interface/Interface";
import { useUtil } from "../Contexts/Util";
import { Routes, Route } from 'react-router-dom';
import Spinner from "../Utilities/Spinner";

const Components = () => {
    return (
        <div className="m-2">
            <Routes>
                    <Route path="login/*" element={<Login />} />
                    <Route path="actions" element={<Actions />} />
                    <Route path ="*" element={<Interface />} />
            </Routes>
        </div>
    )
};

export default Components;