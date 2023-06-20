import { cloneElement, useEffect, useState } from "react";
import { useDom } from "../Canvas";
import formats from "./formats";
import { useEditor } from "../../Editor";

const Format = ({ title, icon, format }) => {
    const { path, updateClassFromPath } = useDom();
    const { page, setPageData } = useEditor();
    const [styles, setStyles] = useState('');
    const editedIcon = cloneElement(icon, { ...icon?.props, size: "25px" });

    const updateElement = () => setPageData({ ...updateClassFromPath(page?.data, path, formats[format]) });

    useEffect(() => {
        if (!path.length) return setStyles(false);
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        const properties = current?.className?.split(" ") || [];
        if (properties.find(prop => prop === formats[format])) return setStyles(true)
        setStyles(false);
    }, [path, updateElement]);

    return (
        <div onClick={updateElement} className={`flex border border-black rounded-lg ${title && 'gap-x-1'} items-center p-0.5 ${styles && 'bg-black/20'} hover:bg-black/20 select-none`}>
            {editedIcon}
            { title && <h1 className="text-sm">{title}</h1> }
        </div>
    )
};

export default Format;