import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';
import Subnav from '../Templates/Subnav';
import Subnavbutton from '../Templates/Subnavbutton';
import Canvas from './Canvas/Canvas';
import Codebase from './Codebase/Codebase';
import Pages from './Pages/Pages';
import { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNav } from '../Context';
import { useEffect } from 'react';

const EditorValues = createContext();
export const useEditor = () => useContext(EditorValues);

export const EditorContext = ({ children }) => {


    const [pageRoute, setPageRoute] = useState('');
    // page the user selects
    const [pages, setPages] = useState([
        {
            name: 'Home',
            route: '/',
            data: { //JSON
                component: 'div',
                id: '0',
                className: '',
                children: []
            }
        }
    ]);
    // all pages data
    const [page, setPage] = useState({});
    // specific page data

    useEffect(() => {
        setPage(pages.find(({ route }) => route === pageRoute) || pages[0]);
        console.log(pages.filter(({ route }) => route === pageRoute) || pages[0])
    }, [pageRoute]);

    useEffect(() => {
        console.log(page, 'page');
        const index = pages.findIndex(( { route }) => route === page.route);
        console.log(index);
        if (!(index >= 0)) return;
        pages[index] = page;
        console.log(pages, 'pages after');
        setPages([...pages]);
    }, [page])

    const serialize = (object, id = '0') => {
        console.log('objkect', object)
        let children = object.children;
        if (children instanceof Array) children = children.map((child, i) => serialize(child, `${id}-${i}`)) || [];
        return { ...object, id, children };
    };

    const setPageData = (pageData) => setPage({ ...page, data: serialize(pageData) });

    const [JSON, setJSON] = useState({
        component: 'div',
        id: '0',
        className: '',
        children: []
    });

    const values = { page, setPageData, pages, setPageRoute, pageRoute, setPage, setPages };
    return ( <EditorValues.Provider value={values}>{children}</EditorValues.Provider> );
};

const Editor = () => {

    useEffect(() => {
        document.title = 'Editor';
    }, []);
    return (
        <div className='grid grid-rows-[auto_minmax(0,_1fr)] m-1'>
            <Subnav>
                <Subnavbutton icon={<FaCode />} text="Codebase" route="/editor/codebase" />
                <Subnavbutton icon={<AiOutlineDrag />} text="Canvas" route="/editor/canvas" />
                <Subnavbutton icon={<MdPages />} text="Pages" route="/editor/pages" />
            </Subnav>
            <EditorContext>
                    <Routes>
                        <Route path="canvas" element={<Canvas />} />
                        <Route path="codebase" element={<Codebase />} />
                        <Route path="pages" element={<Pages />} />
                        <Route path="*" element={<Navigate to="pages" />} /> 
                    </Routes>
            </EditorContext>
        </div>
    )
};

export default Editor;