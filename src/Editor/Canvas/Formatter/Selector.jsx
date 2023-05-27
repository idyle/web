import { cloneElement, useState } from "react";
import formats from "./formats";
import { useEditor } from "../../Editor";
import { useDom } from "../Canvas";

const Selector = ({ title, icon, format, onClick }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });

    const { setPageData, page } = useEditor();
    const { updateStylesFromPath, path } = useDom();
    const [color, setColor] = useState('');
    const onChange = (e) => setColor(e.target.value);

    const onBlur = () => {
        console.log('BLUR BLUR');
        let obj = {};
        obj[format] = color;
        setPageData({ ...updateStylesFromPath(page?.data, path, { ...obj }) });
    };

    return (
        <div className={`flex border border-black rounded-lg ${title && 'gap-x-1'} items-center p-0.5 hover:bg-gray-300 select-none`}>
            <label htmlFor="color">
                {editedIcon}
            </label>
            <input onBlur={onBlur} onChange={onChange} type="color" id="color" value={color} />
   
        </div>
    )
};

export default Selector;