import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useEditor } from '../Editor';
import Toolbar from './Toolbar/Toolbar';
import Dom from './Dom';
import Aos from 'aos';

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {
    const { page } = useEditor();
    const [selected, setSelected] = useState('0');
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState('');
    const [path, setPath] = useState([]);
    const [selectedData, setSelectedData] = useState();

    useEffect(() => {
        if (!selected) return;
        let path = [];
        if (selected?.includes('-')) path = selected.split('-');
        path.shift();
        for (let i = 0; i < path.length; i++) path[i] = parseInt(path[i]);
        setPath(path);
    }, [selected]);

    useEffect(() => {
        if (!path.length) return setSelectedData();
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div' || current.component === 'details') current = current.children[path[depth]];
        setSelectedData(current);
    }, [path]);

    const updateObjectFromPath = (data, path, func) => {
        const clonedData = JSON.parse(JSON.stringify(data));
        let current = clonedData;
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div' || current.component === 'details') current = current.children[path[depth]];
            else current = current[path[depth]];
        };
        current = { ...func(current) };
        // arbitrary func to generalize process
        return clonedData;
    };

    const setObjectFromPath = (data, path, value, raise = false) => {
        const clonedData = JSON.parse(JSON.stringify(data));
        let current = clonedData;
        let nearestParent = current;
        for (let depth = 0; depth < path?.length; depth++) {
            if (current?.component === 'div' || current.component === 'details') {
                current = current?.children?.[path[depth]];
            } 
        };
        if (current?.component !== 'div' && current.component !== 'details') current = nearestParent;

        if (raise) current.children = [ value, ...current?.children ];
        else current.children = [ ...current?.children, value ];

        return clonedData;
    };

    const deleteObjectFromPath = (data, path) => {

        const clonedData = JSON.parse(JSON.stringify(data));
        let value = clonedData;
        for (let d = 0; d < path?.length; d++) if (value?.component === 'div' || value?.component === 'details') value = value?.children?.[path[d]];
        let current = clonedData;
        let nearestParent = current;
    
        for (let depth = 0; depth < path?.length; depth++) {
            if (depth === path?.length - 1) break;
            // we have reached final depth (target component)
            if (current?.component === 'div' || current.component === 'details') {
                nearestParent = current;
                current = current?.children?.[path[depth]];
            } 
        };
        if (current?.component !== 'div' && current.component !== 'details') current = nearestParent;
        // if our selected item is not a div

        current.children = [...current.children.filter(child => child?.id !== value?.id)];
        return clonedData;
    };

    const values = { 
        selected, setSelected, setSelectedData, selectedData,
        hovered, setHovered, path, setPath, clicked, setClicked,
        setObjectFromPath, deleteObjectFromPath, updateObjectFromPath
    };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};

const Canvas = () => {

    return (
        <DomContext>
            <div className={`grid grid-rows-[auto_minmax(0,_1fr)] overflow-auto`}>
                <Toolbar />
                <Dom />
            </div>
        </DomContext>
    )
};

export default Canvas;