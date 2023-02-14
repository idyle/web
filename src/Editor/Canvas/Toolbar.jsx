import { useEditor } from "../Editor";
import { useDom } from "./Canvas";
import { presets } from '../presets';
import { useEffect, useState } from "react";

const Toolbar = () => {

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
        <div className="grid auto-rows-min border border-black p-2 shadow-xl rounded-lg m-1">
            <h1 className="text-xl" onClick={() => appendElement('h1')}>Insert h1</h1>
            <h1 className="text-xl" onClick={() => appendElement('div')}>Insert Div</h1>
            <h1 className="text-xl" onClick={() => appendElement('img')}>Insert img</h1>
            <h1 className="text-xl" onClick={deleteElement}> Delete Element</h1>
        </div> 
    )
};

export default Toolbar;