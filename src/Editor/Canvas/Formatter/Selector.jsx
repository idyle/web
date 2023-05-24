import { cloneElement } from "react";

const Selector = ({ title, icon, onClick }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });
    return (
        <div onClick={onClick} className={`flex border border-black rounded-lg ${title && 'gap-x-1'} items-center p-0.5 hover:bg-gray-300 select-none`}>
            <label htmlFor="color">
                {editedIcon}
            </label>
            <input type="color" id="color" />
        </div>
    )
};

export default Selector;