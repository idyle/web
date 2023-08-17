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
            const index = classes.findIndex(prop => {
                if (prop.includes('-')) prop = prop.split('-').slice(0, prop.split('-').length - 1).join('-');
                console.log('test index find', prop, formats[format]?.classPrefix);
                return prop === formats[format]?.classPrefix;
            });
            // get all current classes and index
            let style = { ...current?.style };
            const key = Object.keys(formats[format]?.style)[0];
            console.log(key, classes, index);
            // get the key of the style prop
            if (Object.hasOwn(current?.style || {}, key) && current?.style?.[key] === formats[format]?.style?.[key]) {
                console.log('key exists!', current?.style, key, index, classes);
                // if the key exists
                if (index >= 0) classes.splice(index, 1);
                console.log('spliced data', classes);
                // if the class is listed, remove it
                delete style[key];
                // remove the key from the style object
            } else if (Object.hasOwn(current?.style || {}, key) && current?.style?.[key] !== formats[format]?.style?.[key]) {
                console.log('key exists but values do not match', current?.style?.[key], '&', formats[format]?.style?.[key]);
                if (index >= 0) classes.splice(index, 1);
                delete style[key];
                classes.push(className);
                style = { ...style, ...formats[format]?.style };
            } else {
                // if the key doesn't exist
                if (index < 0) classes.push(className);
                // if the classes is not listed, add it
                style = { ...style, ...formats[format]?.style };
            };
            current.style = { ...style };
            current.className = classes.join(" ").trim();
            return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, func) });

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