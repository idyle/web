import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';
import Subnav from '../Templates/Subnav';
import Subnavbutton from '../Templates/Subnavbutton';
import Pages from './Pages/Pages';
import { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from "../../../Contexts/Auth";
import { useUtil } from "../../../Contexts/Util";
import { deletePage, editPage } from './requests';
import { useData } from '../../../Contexts/Data';
import { Helmet } from 'react-helmet';
import Router from './Router';

const EditorValues = createContext();
export const useEditor = () => useContext(EditorValues);

export const EditorContext = ({ children }) => {

    const { getToken } = useAuth();
    const { spin, notify, confirm } = useUtil();
    const { pages, setPages, pageId, setPageId } = useData();
    const pageQuery = pages?.find(({ id }) => id === pageId);
    const [page, setPage] = useState(pageQuery);
    const [css, setCss] = useState(pageQuery?.metadata?.css);
    const [toggle, setToggle] = useState(pageQuery?.metadata?.toggle);
    const [font, setFont] = useState(pageQuery?.metadata?.font);

    useEffect(() => {
        const p = pages.find(({ id }) => id === pageId);
        if (!p || !pageId || !pages) return;
        setCss(p?.metadata?.css);
        setToggle(p?.metadata?.toggle);
        setFont(p?.metadata?.font);
    }, [pages, pageId]);

    const edit = async (page) => {
        const index = pages.findIndex(( { id } ) => id === page?.id);
        if (!(index >= 0)) return false;
        // page must exist 
        setPage({ ...page });
        const pageCache = pages[index];
        // updated page & save cache
        const token = await getToken();
        const operation = await editPage(token, page);
        if (operation) {
            // if operation succeeded, update data 
            let array = pages;
            array[index] = page;
            setPages([ ...array ]);
            return true;
        } else {
            notify('Something went wrong trying to edit the page.');
            setPage({ ...pageCache });
            // if false, replace the page with old cache
            return false;
        }
    };

    const remove = async (page) => {
        if (!(await confirm("You're about to delete a page. This action cannot be undone. Proceed?"))) return;
        spin(true);
        const token = await getToken();
        const operation = await deletePage(token, page);
        spin(false);
        if (!operation) return notify('Something went wrong trying to delete this page.');
        setPages(pages.filter(({ id }) => id !== page?.id));
    };

    const serialize = (object, id = '0') => {
        let children = object.children || null;
        if (children instanceof Array) children = children.map((child, i) => serialize(child, `${id}-${i}`)) || [];
        return { ...object, children, id };
    };

    const setPageData = (pageData) => edit({ ...page, data: { ...serialize(pageData) } });
    const setPageMetadata = (pageMetadata) => edit({ ...page, metadata: { ...page?.metadata, ...pageMetadata } });

    const values = { 
        page, setPage, pages, setPages,
        setPageData, setPageId, setPageMetadata,
        remove, edit, serialize,
        toggle, setToggle, css, setCss, font, setFont,
    };
    return ( <EditorValues.Provider value={values}>{children}</EditorValues.Provider> );
};

const Editor = () => {

    const { pages, pageId } = useData();
    const [pageRoute, setPageRoute] = useState('');

    useEffect(() => {
        if (!pages?.length || !pageId) return;
        setPageRoute(pages.find(( { id }) => id === pageId)?.route);
    }, [pageId]);

    return (
        <div className='grid grid-rows-[auto_minmax(0,_1fr)] mx-5'>

            <Helmet>
                <title>idyle - Editor</title>
                <meta name="description" content="Editor" />
                <meta name="keywords" content="Editor" />
                <link rel="canonical" href="/editor" />
            </Helmet>
            <Subnav mode="white">
                <Subnavbutton icon={<FaCode />} text="Codebase" route={`/editor/${pageRoute}?mode=codebase`} />
                <Subnavbutton icon={<AiOutlineDrag />} text="Canvas" route={`/editor/${pageRoute}?mode=canvas`} />
                <Subnavbutton icon={<MdPages />} text="Pages" route="/editor/pages" />
            </Subnav>
            <EditorContext>
                    <Routes>
                        <Route path="pages" element={<Pages />} />
                        <Route path="*" element={<Router />} />
                    </Routes>
            </EditorContext>
        </div>
    )
};

export default Editor;