import { useNav } from "../Context";
import { cloneElement } from "react";

const Navbutton = ({ icon, text, route }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });
    const { path, setPath } = useNav();
    
    return (
        <div onClick={() => setPath(route)} className={`flex ${path === route && 'bg-black text-white'} select-none w-full border rounded-lg border-black place-content-center transform transition duration-100 hover:scale-[.98]`}>
            <div className="flex gap-1 h-[2rem] p-1 items-center">
                {editedIcon}
                <h1 className='text-xl text-inherit font-semibold'>{text}</h1>
            </div>
        </div>
    )
};

export default Navbutton;