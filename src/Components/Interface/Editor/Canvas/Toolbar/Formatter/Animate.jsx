import { cloneElement, useEffect, useState } from "react";
import { useDom } from "../../Canvas";
import { useEditor } from "../../../Editor";
import AOS from 'aos';

const Animate = ({ title, icon }) => {
    const editedIcon = cloneElement(icon, { ...icon?.props, size: "25px" });
    const { path, updateObjectFromPath } = useDom();
    const { page, setPageData } = useEditor();
    const [styles, setStyles] = useState(false);

    const updateElement = () => {
        const func = (current) => {
            if (current?.['data-aos']) delete current['data-aos'];
            if (current?.['data-aos-offset']) delete current['data-aos-offset'];
            if (!current?.['data-aos']) current['data-aos'] = 'fade-in';
            if (!current?.['data-aos-offset']) current['data-aos-offset'] = "0";
            return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, func)} );
    };

    useEffect(() => {
        AOS.refreshHard();
        if (!path.length) return setStyles(false);
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        if (current?.['data-aos']) return setStyles(true);
        setStyles(false);
    }, [path, updateElement]);

    return (
        <div onClick={updateElement} className={`flex border border-inherit rounded-lg ${title && 'gap-x-1'} items-center p-1 ${styles && 'bg-black/10'} hover:bg-black/10 select-none`}>
            {editedIcon}
            { title && <h1 className="text-sm">{title}</h1> }
        </div>
    )
};

export default Animate;