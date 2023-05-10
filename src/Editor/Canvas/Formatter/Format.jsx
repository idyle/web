import { cloneElement } from "react";

const Format = ({ title, icon, onClick}) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    return (
        <div onClick={onClick} className={`flex border border-black rounded-lg ${title && 'gap-x-1'} items-center p-0.5 hover:bg-gray-300 select-none`}>
            {editedIcon}
            { title && <h1 className="text-sm">{title}</h1> }
        </div>
    )
};

export default Format;