import Login from "./Login/Login";
import Actions from "./Actions/Actions";
import Interface from "./Interface";
import { useUtil } from "./Contexts/Util";
import { Routes, Route } from 'react-router-dom';
import ga from 'react-ga4';

ga.initialize('G-FVJ8L21HR7');
ga.send({ hitType: "pageview", page: "/my-path", title: "Custom Title" });


const Components = () => {

    const { loader } = useUtil();
    return (
        <div className={`${loader && 'animate-pulse pointer-events-none select-none'}`}>
            <Routes>
                <Route path="login/*" element={<Login />} />
                <Route path="actions" element={<Actions />} />
                <Route path ="*" element={<Interface />} />
            </Routes>
        </div>
    )
};

export default Components;