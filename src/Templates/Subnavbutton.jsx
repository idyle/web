import { cloneElement, useState, useEffect } from 'react';
import { useNav } from "../Context";
import { useLocation, useNavigate } from 'react-router-dom';

const Subnavbutton =  ({ icon, text, route }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "20px" });
    const { path, setPath } = useNav();

    const [selected, setSelected] = useState(false);

    const navigate = useNavigate();

    const { pathname } = useLocation();

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
        <div onClick={() => navigate(route)} className={`${selected ? 'border-white' : 'border-black'} text-white flex select-none gap-1 items-center border-b-[1px] hover:border-white`}>
            {editedIcon}
            <h1 className="text-xl text-inherit">{text}</h1>
        </div>
    )
};

export default Subnavbutton;