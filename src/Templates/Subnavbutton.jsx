import { cloneElement } from 'react';
import { useNav } from "../Context";

const Subnavbutton =  ({ icon, text, route }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "20px" });
    const { path, setPath } = useNav();

    return (
        <div onClick={() => setPath(route)} className={`${path === route ? 'border-red-200 text-red-200' : 'border-black text-white'} flex select-none gap-1 items-center border-b-[1px] hover:border-red-200 hover:text-red-200`}>
            {editedIcon}
            <h1 className="text-xl text-inherit">{text}</h1>
        </div>
    )
};

export default Subnavbutton;