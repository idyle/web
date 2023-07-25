import { cloneElement, useEffect, useState } from "react";
import { useDom } from "../../Canvas";
import formats from "./formats";
import { useEditor } from "../../../Editor";

const Format = ({ title, icon, format }) => {
    const { path, updateObjectFromPath } = useDom();
    // by default, true
    const { page, setPageData } = useEditor();
    const [styles, setStyles] = useState('');
    const editedIcon = cloneElement(icon, { ...icon?.props, size: "25px" });

    const updateElement = () => {
        let className = formats[format]?.className;
        // for tailwind
        // media query is a tailwind-only feature 
        const func = (current) => {
            // style and class must sync; style is determiner
            let classes = current.className?.split(' ') || [];
            const index = classes.findIndex(prop => prop === className);
            // get all current classes and index
            let style = { ...current?.style };
            const key = Object.keys(formats[format]?.style)[0];
            // get the key of the style prop
            if (Object.hasOwn(current?.style || {}, key)) {
                console.log('key exists!', current?.style, key);
                // if the key exists
                if (index >= 0) classes.splice(index, 1);
                // if the class is listed, remove it
                delete style[key];
                // remove the key from the style object
            } else {
                // if the key doesn't exist
                if (index < 0) classes.push(className);
                // if the classes is not listed, add it
                style = { ...style, ...formats[format]?.style };
            };
            current.style = { ...style };
            current.className = classes.join(" ").trim();
            return current;
            // let style = { ...current?.style };
            // let properties = current.className?.split(' ') || [];
            // const index = properties.findIndex(prop => prop === className);
            // if (index >= 0) properties.splice(index, 1);
            // else properties.push(className);
            // current.className = properties.join(" ").trim();
            // const key = Object.keys(formats[format]?.style)[0];
            // console.log(current.style, current);
            // if (Object.hasOwn(current?.style || {}, key)) style[key] = undefined;
            // else style = { ...style, ...formats[format]?.style };
            // console.log('FINAL STYLE', style);
            // current.style = { ...style };
            // return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, func) });
        // setPageData({ ...updateClassFromPath(page?.data, path, formats[format]) });
    };

    useEffect(() => {
        if (!path.length) return setStyles(false);
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        const properties = current?.className?.split(" ") || [];
        let className = formats[format]?.className;
        // compat addition for media mode (tailwind-only)
        if (properties.find(prop => prop === className)) return setStyles(true);
        setStyles(false);
    }, [path, updateElement]);

    return (
        <div onClick={updateElement} className={`flex border border-gunmetal rounded-lg ${title && 'gap-x-1'} items-center p-1 ${styles && 'bg-black/10'} hover:bg-black/10 select-none`}>
            {editedIcon}
            { title && <h1 className="text-sm">{title}</h1> }
        </div>
    )
};

export default Format;