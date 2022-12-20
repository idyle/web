import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { renderElements } from './Converter';
import { useEditor } from '../Editor';
import Toolbar from './Toolbar';

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {
    const [selected, setSelected] = useState('0');
    const [hovered, setHovered] = useState('');
    const values = { selected, setSelected, hovered, setHovered };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};


const Canvas = () => {

    const { JSON, setJSON } = useEditor();

    useEffect(() => {

        // render HTML based on edited JSON data
        const change = renderElements(JSON);
        setDom(change);
    }, [JSON])
    const [dom, setDom] = useState([]);


    return (
        <div className="grid grid-cols-[20%_80%] m-2">
            <DomContext>
            <Toolbar />

            <div className="grid p-2 overflow-auto shadow-xl rounded-lg m-1">
                {dom}
            </div>
            </DomContext>
        </div>
    )
};

export default Canvas;