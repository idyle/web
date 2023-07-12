import { cloneElement, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProps } from './Subnav';

const Subnavbutton =  ({ icon, text, route, textColor = 'text-black', bgColor = 'bg-black' }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "20px" });

    const [selected, setSelected] = useState(false);

    const navigate = useNavigate();
    const { pathname, search } = useLocation();

    useEffect(() => {
        if (`${pathname}${search}` === route) return setSelected(true);
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
    }, [pathname, search, route]);

    const { mode } = useProps();
    // let mode = 'black';
    let style, borderSelected, borderUnselected;
    // refers to main bg 
    if (mode === 'black') {
        // probably best to use this as an object
        borderSelected = 'border-white';
        borderUnselected = 'border-gunmetal';
        style = 'text-white hover:border-white hover:bg-white/20';
    } else {
        borderSelected = 'border-gunmetal';
        borderUnselected = 'border-white';
        style = 'text-gunmetal hover:border-gunmetal hover:bg-gunmetal/20'
    }
    

    return (
        <div onClick={() => navigate(route)} className={`${selected ? borderSelected : borderUnselected} flex select-none gap-1 items-center border-b-[1px] hover:opacity-80 ${style}`}>
            {editedIcon}
            <h1 className="text-xl text-inherit">{text}</h1>
        </div>
    )
};

export default Subnavbutton;