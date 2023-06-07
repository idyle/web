import { cloneElement, useState, useEffect } from "react";
import { useEditor } from "../../Editor";
import { useDom } from "../Canvas";

const Color = ({ icon, format }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    const { setPageData, page } = useEditor();
    const { updateStylesFromPath, path } = useDom();
    const [color, setColor] = useState('');
    const onChange = (e) => setColor(e.target.value);

    const onBlur = () => {
        let obj = {};
        obj[format] = color;
        setPageData({ ...updateStylesFromPath(page?.data, path, { ...obj }) });
    };

    useEffect(() => {
        if (!path.length) return setColor('');
        // if none is selected, color === ''
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        const properties = current?.style || {};
        if (!properties[format]) return setColor('');
        // if none is selected, we'll default to color === ''
        setColor(properties[format]);
    }, [path]);

    return (
        <div className={`flex border border-black rounded-lg items-center p-0.5 hover:bg-gray-300 select-none`}>
            <label htmlFor="color">
                {editedIcon}
            </label>
            <input onBlur={onBlur} onChange={onChange} type="color" id="color" value={color} />
   
        </div>
    )
};

export default Color;