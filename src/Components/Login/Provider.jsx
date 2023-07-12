import { cloneElement } from "react";

const Provider = ({ onClick, icon, text }) => {

    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    return (
        <div onClick={onClick} className="flex cursor-pointer select-none rounded-lg border-2 border-gunmetal place-content-center hover:scale-[.98]">
            <div className="flex p-2 gap-2 items-center">
                {editedIcon}
                <h1 className='text-2xl text-inherit text-center'>{text}</h1>
            </div>
        </div>
    )
};

export default Provider;