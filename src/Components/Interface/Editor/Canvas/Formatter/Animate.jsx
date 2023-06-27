import { cloneElement, useEffect, useState } from "react";
import { useDom } from "../Canvas";
import { useEditor } from "../../Editor";
import AOS from 'aos';

const Animate = ({ title, icon, animate }) => {
    const editedIcon = cloneElement(icon, { ...icon?.props, size: "25px" });
    const { path, updateFromPath } = useDom();
    const { page, setPageData } = useEditor();
    const [styles, setStyles] = useState(false);

    const updateElement = () => {
        const func = (current) => {
            if (current?.['data-aos']) delete current['data-aos'];
            else current['data-aos'] = 'fade-in';
            return current;
        };
        setPageData({ ...updateFromPath(page?.data, path, func)} );
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
        <div onClick={updateElement} className={`flex border border-white rounded-lg ${title && 'gap-x-1'} items-center p-0.5 ${styles && 'bg-white/50'} hover:bg-white/50 select-none`}>
            {editedIcon}
            { title && <h1 className="text-sm">{title}</h1> }
        </div>
    )
};

export default Animate;