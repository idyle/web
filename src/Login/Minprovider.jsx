import { cloneElement } from "react";

const Minprovider = ({ onClick, icon }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    return (
        <div onClick={onClick} className="grid p-3 items-center justify-items-center cursor-pointer select-none border rounded-lg border border-black hover:scale-[.98]">
            {editedIcon}
        </div>
    )
};

export default Minprovider;