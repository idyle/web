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
    const { pages, setPages, pageId, setPageId } = useData();
    const test = pages.find(({ id }) => id === pageId);
    const [page, setPage] = useState((test));

    const save = async (page) => {
        const index = pages.findIndex(( { id } ) => id === page?.id);
        if (!(index >= 0)) return;
        const operation = await savePage(user?.accessToken, page);
        if (!operation) return notify('Something went wrong trying to create the page.');
        pages[index] = page;
        setPages([ ...pages ]);
    };

    const remove = async (page) => {
        if (!(await prompt("You're about to delete a page. This action cannot be undone. Proceed?"))) return;
        setLoader(true);
        const operation = await deletePage(user?.accessToken, page);
        setLoader(false);
        if (!operation) return notify('Something went wrong trying to delete this page.');
        setPages(pages.filter(({ id }) => id !== page?.id));
    };

    // useEffect(() => {
    //     console.log('CALLED PAGE');
    //     const index = pages.findIndex(( { id }) => id === page.id);
    //     if (!(index >= 0)) return;
    //     let arr = pages;
    //     // console.log('Page on setting to array', page);
    //     arr[index] = page;
    //     savePage(user?.accessToken, page);
    //     setPages([...arr]);
    // }, [page]);

    // useEffect(() => {
    //     console.log('PAGE CHANGED IS DETECTED', page);
    //     let mutatedPages = [ ...pages ];
    //     const index = mutatedPages.findIndex(( { id }) => id === page?.id);
    //     if (!(index >= 0)) return;
    //     mutatedPages[index] = { ...page };
    //     savePage(user?.accessToken, page);
    //     setPages([ ...mutatedPages ]);
    // }, [page]);

    // useEffect(() => {
    //     console.log('PAGE ID CALLED');
    //     if (!pageId) return setPage({});
    //     setPage(pages.find(({ id }) => id === pageId) || {});
    // }, [pageId]);

    const serialize = (object, id = '0') => {
        let children = object.children || null;
        if (children instanceof Array) children = children.map((child, i) => serialize(child, `${id}-${i}`)) || [];
        // console.log('TO SERIALIZE', object, id, children);
        return { ...object, children, id };
    };

    const setPageData = (pageData) => {
        // we will just trigger the save directly to avoid interruption from useEffect
        // console.log('Serialized', serialize(pageData));
        const data = { ...serialize(pageData) };
        setPage({ ...page, data });
        save({ ...page, data });
    };

    const values = { page, setPageData, pages, setPage, setPages, save, remove, setPageId };
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