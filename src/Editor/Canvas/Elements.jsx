import { useEditor } from "../Editor";
import { useDom } from "./Canvas";
import { presets } from '../presets';
import { useEffect, useState } from "react";
import { RxText, RxSection, RxImage, RxVideo, RxLayout, RxViewVertical, RxListBullet, RxBarChart, RxLetterCaseCapitalize, RxButton, RxLink2 } from 'react-icons/rx';

const Elements = () => {

    const { page, setPageData } = useEditor();
    const { selected, setSelected } = useDom();
    const [path, setPath] = useState();

    useEffect(() => {
        if (!selected) return;
        let path = [];
        if (selected?.includes('-')) path = selected.split('-');
        path.shift();
        for (let i = 0; i < path.length; i++) path[i] = parseInt(path[i]);
        setPath(path);
    }, [selected]);

    const setObjectFromPath2 = () => {

    }

    const setObjectFromPath = (data, path, value) => {
        console.log('DATA', data);
        let current = data;
        let nearestParent = current;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') {
                nearestParent = current;
                current = current.children[path[depth]];
            } 
        };
        console.log(current, 'current!')
        if (current?.component !== 'div') current = nearestParent;
        // if our selected item is not a div

        current.children = [...current.children, value];
        return data;
    };

    const getValue = (data, path) => {
        let current = data;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') {
                current = current.children[path[depth]];
            } 
        };
        return current;
    }

    const deleteObjectFromPath = (data, path) => {

        let value = getValue(data, path);
        console.log('DATA', data);
        let current = data;
        let nearestParent = current;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') {
                nearestParent = current;
                current = current.children[path[depth]];
            } 
        };
        if (current.component !== 'div') current = nearestParent;
        // if our selected item is not a div

        current.children = current.children.filter(child => child.id !== value.id);
        console.log('NEW DATA', data);
        return data;
    };

    const deleteElement = () => setPageData({ ...deleteObjectFromPath(page.data, path) });

    const appendElement = (preset) => setPageData({ ...setObjectFromPath(page.data, path, { ...presets[preset] }) });

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] p-1 shadow-xl border border-black rounded-lg gap-1">
            <h1 className="text-3xl font-bold text-center">Elements</h1>
            <div className="grid auto-rows-min gap-1 p-1 overflow-auto">
                {/* <h1 className="text-xl" onClick={() => appendElement('h1')}>Insert h1</h1>
                <h1 className="text-xl" onClick={() => appendElement('div')}>Insert Div</h1>
                <h1 className="text-xl" onClick={() => appendElement('img')}>Insert img</h1> */}
                {/* <h1 className="text-xl" onClick={deleteElement}> Delete Element</h1> */}

                <div onClick={() => appendElement('h1')} className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxLetterCaseCapitalize size="25px" />
                    <h1 className="text-2xl">Header</h1>
                </div>

                <div onClick={() => appendElement('h1')} className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxText size="25px" />
                    <h1 className="text-2xl">Text</h1>
                </div>

                <div onClick={() => appendElement('div')} className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxSection size="25px" />
                    <h1 className="text-2xl">1 Section</h1>
                </div>

                <div className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxViewVertical size="25px" />
                    <h1 className="text-2xl">2 Section</h1>
                </div>

                <div className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxLayout size="25px" />
                    <h1 className="text-2xl">3 Section</h1>
                </div>

                <div onClick={() => appendElement('img')} className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxImage size="25px" />
                    <h1 className="text-2xl">Image</h1>
                </div>

                <div className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxVideo size="25px" />
                    <h1 className="text-2xl">Video</h1>
                </div>

                <div className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxListBullet size="25px" />
                    <h1 className="text-2xl">Navigation Bar</h1>
                </div>

                <div className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxButton size="25px" />
                    <h1 className="text-2xl">Button</h1>
                </div>

                <div className="flex items-center place-content-center gap-1 border border-black p-1 rounded-lg">
                    <RxLink2 size="25px" />
                    <h1 className="text-2xl">Link</h1>
                </div>

            </div> 
        </div>
    )
};

export default Elements;