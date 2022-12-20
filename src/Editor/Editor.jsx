import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';
import Subnav from '../Templates/Subnav';
import Subnavbutton from '../Templates/Subnavbutton';
import Canvas from './Canvas/Canvas';
import Codebase from './Codebase/Codebase';
import { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNav } from '../Context';
import { useEffect } from 'react';

const EditorValues = createContext();
export const useEditor = () => useContext(EditorValues);

export const EditorContext = ({ children }) => {
    const [JSON, setJSON] = useState({
        component: 'div',
        id: '0',
        className: '',
        children: []
    });
    const values = { JSON, setJSON };
    return ( <EditorValues.Provider value={values}>{children}</EditorValues.Provider> );
};

const Editor = () => {

    useEffect(() => {
        document.title = 'Editor';
    }, []);
    return (
        <div className='grid grid-rows-[auto_minmax(0,_1fr)]'>
            <div className="grid w-full bg-white p-1 flex items-center justify-items-center">
                <Subnav>
                    <Subnavbutton icon={<FaCode />} text="Codebase" route="/editor/codebase" />
                    <Subnavbutton icon={<AiOutlineDrag />} text="Canvas" route="/editor/canvas" />
                    <Subnavbutton icon={<MdPages />} text="Pages" />
                </Subnav>
            </div>
            <EditorContext>
                    <Routes>
                        <Route path="canvas" element={<Canvas />} />
                        <Route path="codebase" element={<Codebase />} />
                        <Route path="*" element={<Navigate to="canvas" />} /> 
                    </Routes>
            </EditorContext>
        </div>
    )
};

export default Editor;