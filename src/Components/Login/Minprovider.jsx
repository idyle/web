import { cloneElement } from "react";

const Minprovider = ({ onClick, icon }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    return (
        <div onClick={onClick} className="grid p-3 items-center justify-items-center cursor-pointer select-none rounded-lg border-2 border-gunmetal hover:scale-[.98]">
            {editedIcon}
        </div>
    )
};

export default Minprovider;