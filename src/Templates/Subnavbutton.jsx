import { cloneElement, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProps } from './Subnav';

const Subnavbutton =  ({ icon, text, route, textColor = 'text-black', bgColor = 'bg-black' }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "20px" });

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
    }, [pathname, route]);

    const { mode } = useProps();
    // let mode = 'black';
    let style, borderSelected, borderUnselected;
    // refers to main bg 
    if (mode === 'black') {
        // probably best to use this as an object
        borderSelected = 'border-white';
        borderUnselected = 'border-black';
        style = 'text-white hover:border-white hover:bg-black';
    } else {
        borderSelected = 'border-black';
        borderUnselected = 'border-white';
        style = 'text-black hover:border-black hover:bg-white'
    }
    

    return (
        <div onClick={() => navigate(route)} className={`${selected ? borderSelected : borderUnselected} flex select-none gap-1 items-center border-b-[1px] hover:opacity-80 ${style}`}>
            {editedIcon}
            <h1 className="text-xl text-inherit">{text}</h1>
        </div>
    )
};

export default Subnavbutton;