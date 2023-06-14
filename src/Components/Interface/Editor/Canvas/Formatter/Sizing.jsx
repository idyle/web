import { RxPlus, RxMinus } from 'react-icons/rx';
import { cloneElement, useEffect, useState } from 'react';
import { useEditor } from '../../Editor';
import { useDom } from '../Canvas';

const Sizing = ({ icon, format }) => {

    const editedIcon = cloneElement(icon, { ...icon?.props, size: "25px" });   
    const { setPageData, page } = useEditor();
    const { path, updateStylesFromPath } = useDom();
    const [px, setPx] = useState(0);

    // rather than a useEffect, create a func that updates the element
    // in addition: display the default value by setPx()

    const updateElement = (entry) => {
        let obj = {};
        obj['lineHeight'] = `${entry + 8}px`;
        obj[format] = `${entry}px`;
        setPageData({ ...updateStylesFromPath(page?.data, path, { ...obj }) });
    };

    useEffect(() => {
        if (!path.length) return setPx(0);
        // if none is selected, px === 0 
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        const properties = current?.style || {};
        if (!properties[format]) return setPx(0);
        // if none is selected, we'll default to px === 0
        const number = parseInt(properties[format]?.split('px')?.[0]);
        // expect eg: 10px -> into str 10 -> into int 10
        if (number) setPx(number);
    }, [path, updateElement]);

    const onChange = (e) => {
        const entry = parseInt(e.target.value);
        if (entry < 1 || entry > 100 || isNaN(entry)) return setPx(0);
        setPx(entry);
        updateElement(entry);
    };

    const add = () => {
        if ((px + 1) > 100) return;
        setPx(px + 1);
        updateElement(px + 1);
    };

    const deduct = () => {
        if ((px - 1) < 0) return;
        setPx(px - 1);
        updateElement(px - 1);
    };

    return (
        <div className="flex border p-0.5 gap-x-0.5 border-black select-none rounded-lg items-center bg-white">
            {editedIcon}
            <div onClick={add} className={`flex border bg-black text-white rounded-lg items-center p-0.5 hover:bg-gray-300 select-none`}>
                <RxPlus size="20px" />
            </div>
            <input onChange={onChange} className="w-[30px] text-center outline-none bg-white" type="tel" value={px} />
            <div onClick={deduct} className={`flex border bg-black text-white rounded-lg items-center p-0.5 hover:bg-gray-300 select-none`}>
                <RxMinus size="20px" />
            </div>
        </div>
    );
};

export default Sizing;