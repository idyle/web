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
import { useEffect } from 'react';
import { useAuth } from "../Contexts/Auth";
import { useUtil } from "../Contexts/Util";
import { savePage, listPages, deletePage } from './requests';
import { useData } from '../Contexts/Data';
import { Helmet } from 'react-helmet';

const EditorValues = createContext();
export const useEditor = () => useContext(EditorValues);

export const EditorContext = ({ children }) => {

    const { user } = useAuth();
    const { setLoader, notify, prompt } = useUtil();
    const { pages, setPages, page, setPage } = useData();

    // const [pageRoute, setPageRoute] = useState();
    // const [page, setPage] = useState({});

    const save = async (page) => {
        setLoader(true);
        const operation = await savePage(user?.accessToken, page);
        setLoader(false);
        if (!operation) return notify('Something went wrong trying to create the page.');
    };

    const remove = async (page) => {
        if (!(await prompt("You're about to delete a page. This action cannot be undone. Proceed?"))) return;
        setLoader(true);
        const operation = await deletePage(user?.accessToken, page);
        setLoader(false);
        if (!operation) return notify('Something went wrong trying to delete this page.');
        console.log('removing... page', page?.route);
        setPages(pages.filter(({ id }) => id !== page?.id));
    };

    // useEffect(() => {
    //     setPage(pages.find(({ route }) => route === pageRoute) || pages[0]);
    //     console.log(pages.filter(({ route }) => route === pageRoute) || pages[0])
    // }, [pageRoute]);

    useEffect(() => {
        console.log(page, 'page');
        const index = pages.findIndex(( { route }) => route === page.route);
        console.log(index);
        if (!(index >= 0)) return;
        pages[index] = page;
        savePage(user?.accessToken, page);
        setPages([...pages]);
    }, [page])

    const serialize = (object, id = '0') => {
        let children = object.children;
        if (children instanceof Array) children = children.map((child, i) => serialize(child, `${id}-${i}`)) || [];
        console.log('TO SERIALIZE', object, id);
        return { ...object, id, children };
    };

    const setPageData = (pageData) => setPage({ ...page, data: serialize(pageData) });

    const values = { page, setPageData, pages, setPage, setPages, save, remove };
    return ( <EditorValues.Provider value={values}>{children}</EditorValues.Provider> );
};

const Editor = () => {

    return (
        <div className='grid grid-rows-[auto_minmax(0,_1fr)] m-1'>

            <Helmet>
                <title>idyle - Editor</title>
                <meta name="description" content="Editor" />
                <meta name="keywords" content="Editor" />
                <link rel="canonical" href="/editor" />
            </Helmet>
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