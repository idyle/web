import { RxPlus, RxMinus } from 'react-icons/rx';
import { cloneElement, useEffect, useState } from 'react';
import { useEditor } from '../../Editor';
import { useDom } from '../Canvas';

const Inputter = ({ icon, format }) => {

    const editedIcon = cloneElement(icon, { ...icon?.props, size: "25px" });
    
    const { setPageData, page } = useEditor();
    const { path, updateFromPath, updateStylesFromPath } = useDom();
    const [px, setPx] = useState(0);

    const func = (current) => {
        let properties = current.className?.split(' ') || [];
        const index = properties.findIndex(p => (p.startsWith('text-') && p.endsWith('xl')));
        if (index >= 0) properties.splice(index, 1);
        else properties.push(`text-${px}xl`);
        current.className = properties.join(" ");
        return current;
    };

    useEffect(() => {
        if (typeof px !== 'number') return;
        console.log('PX', px);
        let obj = {};
        obj[format] = `${px}px`;
        setPageData({ ...updateStylesFromPath(page?.data, path, { ...obj }) })
    }, [px])

    const onChange = (e) => {
        console.log('HI');
        const entry = parseInt(e.target.value);
        if (entry < 1 || entry > 100) return;
        else if (entry >= 1 && entry <= 100) return setPx(entry);
        else setPx(0);
    };

    const add = () => {
        if ((px + 1) > 100) return;
        setPx(px + 1);
    };

    const deduct = () => {
        if ((px - 1) < 0) return;
        setPx(px - 1);
    };


    return (
        <div className="flex border p-0.5 gap-x-0.5 border-black select-none rounded-lg items-center">
            {editedIcon}
            <div onClick={add} className={`flex border bg-black text-white rounded-lg items-center p-0.5 hover:bg-gray-300 select-none`}>
                <RxPlus size="20px" />
            </div>
            <input onChange={onChange} className="w-[30px] text-center outline-none" type="tel" value={px} />
            <div onClick={deduct} className={`flex border bg-black text-white rounded-lg items-center p-0.5 hover:bg-gray-300 select-none`}>
                <RxMinus size="20px" />
            </div>
        </div>
    );
};

export default Inputter;