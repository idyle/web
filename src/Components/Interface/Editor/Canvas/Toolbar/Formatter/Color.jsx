import { cloneElement, useState, useEffect } from "react";
import { useEditor } from "../../../Editor";
import { useDom } from "../../Canvas";

const Color = ({ icon, format }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    const { setPageData, page } = useEditor();
    const { updateObjectFromPath, path } = useDom();
    const [color, setColor] = useState('#000000');
    const onChange = (e) => setColor(e.target.value);

    const onBlur = () => {
        let obj = {};
        obj[format] = color;
        const func = (current) => {
            if (current) current.style = { ...current.style, ...obj };
            return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, func) });
        // setPageData({ ...updateStylesFromPath(page?.data, path, { ...obj }) });
    };

    useEffect(() => {
        if (!path.length) return setColor('#000000');
        // if none is selected, color === ''
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        const properties = current?.style || {};
        if (!properties[format]) return setColor('#000000');
        // if none is selected, we'll default to color === ''
        setColor(properties[format]);
    }, [path]);

    return (
        <div className={`flex border-2 border-inherit text-gunmetal rounded-lg items-center p-0.5 select-none`}>
            <label htmlFor="color">
                {editedIcon}
            </label>
            <input onBlur={onBlur} onChange={onChange} type="color" id="color" value={color} />
   
        </div>
    )
};

export default Color;