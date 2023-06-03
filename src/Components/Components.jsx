import Login from "./Login/Login";
import Actions from "./Actions/Actions";
import Interface from "./Interface/Interface";
import { useUtil } from "../Contexts/Util";
import { Routes, Route } from 'react-router-dom';

const Components = () => {

    const { loader } = useUtil();
    return (
        <div className={`${loader && 'animate-pulse pointer-events-none select-none h-full'}`}>
            <Routes>
                <Route path="login/*" element={<Login />} />
                <Route path="actions" element={<Actions />} />
                <Route path ="*" element={<Interface />} />
            </Routes>
        </div>
    )
};

export default Components;