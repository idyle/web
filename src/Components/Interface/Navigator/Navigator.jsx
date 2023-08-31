import Search from "./Search/Search";
import { BsPersonCircle } from 'react-icons/bs';
import { BiMenu, BiX, BiHelpCircle } from 'react-icons/bi';
import Route from './Route';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth";
import { useState, useEffect } from "react";

const Navigator = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setClicked(false);
        window.onresize = () => setClicked(false);
    }, [location]);

    return (


        <div className={`flex flex-col p-3 px-6 gap-3 bg-black text-white w-full top-0 z-50 select-none ${clicked ? 'h-[100dvh] fixed' : 'h-auto sticky'}`}>

            { !clicked ? 
            <div className="md:hidden flex items-center gap-3">
                <BiMenu size="40px" onClick={() => setClicked(true)}/> 
                <h1 className="text-3xl font-bold">idyle</h1>
            </div>
            : <BiX className="md:hidden" size="40px" onClick={() => setClicked(false)}  />
            }
            
            <div className={`${clicked ? 'flex' : 'hidden'} md:flex md:justify-between h-full w-full flex-col md:flex-row items-center place-content-center gap-3`}>
                <div className="flex flex-col md:flex-row gap-3 items-center">
                    <h1 className="text-6xl md:text-3xl font-bold">idyle</h1>
                    <Search />
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <Route title="Home" to="/" />
                        <Route title="Editor" to="/editor/pages"  />
                        <Route title="Deployer" to="/deployer/station" />
                        <Route title="Objects" to="/objects" />
                        <Route title="Docs" to="/docs" />
                    </div>
                </div>

                <div onClick={() => navigate('/accounts/profile')} className="flex">
                    {user?.picture ? <img className="w-[60px] h-[60px] md:w-[40px] md:h-[40px] rounded-full" src={user?.picture} /> : <BsPersonCircle size="40px" />}
                </div>
            </div>
        </div>
    )
};

export default Navigator;