import { cloneElement, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbutton = ({ icon, text, route }) => {

    const editedIcon = cloneElement(icon, { className: 'h-[40px] w-[40px] md:h-[25px] md:w-[25px]', color: "inherit" });

    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const [selected, setSelected] = useState(false);

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
    }, [pathname, search, route])
    
    return (
        <div onClick={() => navigate(route)} className={`flex p-3 md:p-0 ${selected && 'bg-black text-white'} select-none w-full md:border rounded-lg border-black place-content-center transform transition duration-100 hover:scale-[.98]`}>
            <div className="flex gap-1 h-[2rem] md:p-1 items-center">
                {editedIcon}
                <h1 className='text-5xl md:text-xl text-inherit font-bold'>{text}</h1>
            </div>
        </div>
    )
};

export default Navbutton;