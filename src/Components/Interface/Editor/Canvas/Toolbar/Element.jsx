import { cloneElement } from "react";

const Elements = ({ title, icon, onClick }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });
    return (
        <div onClick={onClick} className="flex items-center place-content-center gap-1 border border-white p-1 rounded-lg hover:scale-[.98] select-none all-initial ">
            {editedIcon}
            <h1 className="hidden md:block text-2xl">{title}</h1>
        </div>
    )
};

export default Elements;