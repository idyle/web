import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { renderElements } from './Converter';
import { useEditor } from '../Editor';
import Elements from './Elements';
import { useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar';
import Formatter from './Formatter';

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {
    const [selected, setSelected] = useState('0');
    const [hovered, setHovered] = useState('');
    const values = { selected, setSelected, hovered, setHovered };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};

const Canvas = () => {

    const { page } = useEditor();
    const navigate = useNavigate();
    const [dom, setDom] = useState([]);
    useEffect(() => {
        // handle case where no page selected / exists
        if (!page?.data) return navigate('/editor/pages');
        console.log('CURRNET PAGE ON CANVAS', page);
        setDom(renderElements(page?.data));
    }, [page?.data]);

    return (
        <DomContext>
        <div className="grid h-full grid-cols-[20%_80%]">

            <div className="grid grid-rows-[80%_20%] gap-1 p-1">
                <Elements />
                <Formatter />
            </div>

            <div className="grid grid-rows-[10%_90%] overflow-auto p-1">
                <Toolbar />

                <div className="grid p-1 overflow-auto shadow-xl rounded-lg">
                    {dom}
                </div>
            </div>
        </div>
        </DomContext>
    )
};

export default Canvas;