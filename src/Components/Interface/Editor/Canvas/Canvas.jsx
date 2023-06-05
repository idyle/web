import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { constructDom } from './Converter';
import { useEditor } from '../Editor';
import Toolbar from './Toolbar/Toolbar';
import Formatter from './Formatter/Formatter';

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {
    const [selected, setSelected] = useState('0');
    const [hovered, setHovered] = useState('');
    const [path, setPath] = useState([]);

    const updateFromPath = (data, path, func) => {
        let current = data;
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') current = current.children[path[depth]];
            else current = current[path[depth]];
        };
        current = { ...func(current) };
        // arbitrary func to generalize process
        return data;
    };

    const updateStylesFromPath = (data, path, value) => {
        let current = data;
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') current = current.children[path[depth]];
            else current = current[path[depth]];
        };
        if (current) current.style = { ...current.style, ...value };
        return data;
    };

    const updateClassFromPath = (data, path, value) => {
        let current = data;
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') current = current.children[path[depth]];
            else current = current[path[depth]];
        };

        let properties = current.className?.split(' ') || [];
        const index = properties.findIndex(prop => prop === value);
        if (index >= 0) properties.splice(index, 1);
        else properties.push(value);

        current.className = properties.join(" ");
        return data;
    };

    const updateChildrenFromPath = (data, path, value) => {
        let current = data;
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') current = current.children[path[depth]];
            else current = current[path[depth]];
        };
        current.children = value;
        return data;
    };

    const updateObjectFromPathCustom = (data, path, key, value) => {
        let current = data;
    
        for (let depth = 0; depth < path.length; depth++) {
            if (current.component === 'div') current = current.children[path[depth]];
            else current = current[path[depth]];
        };

        current[key] = value;
        console.log('rECEIVING FROM PATH WITH SPREAD', current);
        return data;
    };

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

    const setObjectFromPath = (data, path, value, raise = false) => {
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

        if (raise) current.children = [ value, ...current.children ];
        else current.children = [ ...current.children, value ];

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
        updateChildrenFromPath, updateClassFromPath, updateStylesFromPath,
        updateFromPath, updateObjectFromPathCustom
    };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};

const Canvas = () => {

    const { page, css } = useEditor();
    const [dom, setDom] = useState([]);

    useEffect(() => {
        console.log('entered canvas!', page?.data, page?.id);
        if (!page?.id || !page?.data) return;
        setDom(constructDom(page?.data, css));
    }, [page?.id, page?.data, css]);

    return (
        <DomContext>
            <div className="grid grid-rows-[30%_70%] md:grid-rows-1 md:grid-cols-[20%_80%] overflow-auto">
                    <Toolbar />
                <div className="grid grid-rows-[20%_80%] md:grid-rows-[10%_90%] p-1">
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