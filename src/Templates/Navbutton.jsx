import { useNav } from "../Context";
import { cloneElement, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbutton = ({ icon, text, route }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });
    const { path, setPath } = useNav();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        // part starts with an initial /
        let splicedPath = pathname?.split('/') || [];
        let splicedMatch = route?.split('/') || [];
        
        // for each of the matched routes, lets test its corresponding equivalent
        // we'll only test through the match routes, in case the path has more routes after
        for (let i = 0; i < splicedMatch.length; i++) {
            let itemMatch = splicedMatch[i];
            let itemPath = splicedPath[i];
            if (itemMatch === itemPath && i === splicedMatch.length-1) return setSelected(true);
        };
        return setSelected(false);
    }, [pathname, route])
    
    return (
        <div onClick={() => navigate(route)} className={`flex ${selected && 'bg-black text-white'} select-none w-full border rounded-lg border-black place-content-center transform transition duration-100 hover:scale-[.98]`}>
            <div className="flex gap-1 h-[2rem] p-1 items-center">
                {editedIcon}
                <h1 className='text-xl text-inherit font-semibold'>{text}</h1>
            </div>
        </div>
    )
};

export default Navbutton;