import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { renderElements } from './Converter';
import { useEditor } from '../Editor';
import Elements from './Toolbar/Toolbar';
import { useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar/Toolbar';
import Formatter from './Formatter/Formatter';
import { useUtil } from '../../Contexts/Util';

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {
    const [selected, setSelected] = useState('0');
    const [hovered, setHovered] = useState('');
    const [path, setPath] = useState([]);

    const updateObjectFromPath = (data, path, value, merge = true) => {
        let current = data;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') current = current.children[path[depth]];
            else current = current[path[depth]];
        };

        if (!merge) current.className = value;
        else current.className = `${current?.className} ${value}`;
        return data;
    };

    const setObjectFromPath = (data, path, value) => {
        let current = data;
        let nearestParent = current;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') {
                nearestParent = current;
                current = current.children[path[depth]];
            } 
        };
        if (current?.component !== 'div') current = nearestParent;
        // if our selected item is not a div

        current.children = [...current.children, value];
        return data;
    };

    const deleteObjectFromPath = (data, path) => {

        let value = data;
        for (let d = 0; d < path.length; d++) if (value.component === 'div') value = value.children[path[d]];
        let current = data;
        let nearestParent = current;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (depth === path.length - 1) break;
            // we have reached final depth (target component)
            if (current.component === 'div') {
                nearestParent = current;
                current = current.children[path[depth]];
            } 
        };
        if (current.component !== 'div') current = nearestParent;
        // if our selected item is not a div

        current.children = current.children.filter(child => child.id !== value.id);
        return data;
    };

    const values = { 
        selected, setSelected, hovered, setHovered, path, setPath,
        updateObjectFromPath, setObjectFromPath, deleteObjectFromPath,
    };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};

const Canvas = () => {

    const { page } = useEditor();
    const [dom, setDom] = useState([]);

    useEffect(() => {
        // handle case where no page selected / exists
        if (page?.data) setDom(renderElements(page?.data));
    }, [page?.data]);

    return (
        <DomContext>
        <div className="grid h-full grid-cols-[20%_80%]">

                <Toolbar />

            <div className="grid grid-rows-[10%_90%] overflow-auto p-1">
                <Formatter />

                <div className="grid p-1 overflow-auto shadow-xl rounded-lg">
                    {dom}
                </div>
            </div>
        </div>
        </DomContext>
    )
};

export default Canvas;