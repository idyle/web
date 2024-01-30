import Pages from './Pages/Pages';
import { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from "../../../Contexts/Auth";
import { useUtil } from "../../../Contexts/Util";
import { deletePage, editEditorData, editPage } from './requests';
import { useData } from '../../../Contexts/Data';
import { Helmet } from 'react-helmet';
import Router from './Router';

const EditorValues = createContext();
export const useEditor = () => useContext(EditorValues);

export const EditorContext = ({ children }) => {

    const { getToken } = useAuth();
    const { spin, notify, confirm } = useUtil();
    const { pages, setPages, pageId, setPageId, setEditorData } = useData();
    const pageQuery = pages?.find(({ id }) => id === pageId);
    const [page, setPage] = useState(pageQuery);
    const [pageCache, setPageCache] = useState();
    const [clipboard, setClipboard] = useState();
    const [css, setCss] = useState(pageQuery?.metadata?.css);
    const [toggle, setToggle] = useState(pageQuery?.metadata?.toggle);
    const [font, setFont] = useState(pageQuery?.metadata?.font);

    useEffect(() => {
        const p = pages.find(({ id }) => id === pageId);
        if (!p || !pageId || !pages) return;
        setCss(p?.metadata?.css);
        setToggle(p?.metadata?.toggle ?? true);
        setFont(p?.metadata?.font || 'Times New Roman');
    }, [pages, pageId]);

    useEffect(() => {
        setPageCache();
        setClipboard();
    }, [pageId]);

    const serialize = (object, id = '0') => {
        let children = object.children || null;
        if (children instanceof Array) children = children.map((child, i) => serialize(child, `${id}-${i}`)) || [];
        return { ...object, children, id };
    };

    const edit = async (page) => {
        const index = pages.findIndex(( { id } ) => id === page?.id);
        if (!(index >= 0)) return false;
        // page must exist 
        let currentArr = [ ...pages ];
        // deep copy of array
        const pageCache = { ...currentArr[index] };
        setPageCache({ ...pageCache, data: { ...serialize(pageCache?.data) } });
        // set page cache
        setPage({ ...page, data: { ...serialize(page?.data) } });
        currentArr[index] = { ...page, data: { ...serialize(page?.data) } };
        setPages([ ...currentArr ]);
        // update actual page 
        const token = await getToken();
        const operation = await editPage(token, { ...page, data: { ...serialize(page?.data) } });
        if (operation) return true;
        notify('Something went wrong trying to edit the page.');
        let array = [ ...pages ];
        setPage({ ...pageCache, data: { ...serialize(pageCache?.data) } });
        array[index] = { ...pageCache, data: { ...serialize(pageCache?.data) } };
        setPages([ ...array ]);
        // if false, replace the page with old cache
        return false;
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

    const editData = async (data) => { 
        const token = await getToken();
        const operation = await editEditorData(token, data);
        if (!operation) return notify('Something went wrong trying to edit the editor data.');
        setEditorData({ ...data });
    };

    const setPageData = (pageData) => edit({ ...page, data: { ...serialize(pageData) } });
    const setPageMetadata = (pageMetadata) => edit({ ...page, metadata: { ...page?.metadata, ...pageMetadata } });

    const values = { 
        page, setPage, pages, setPages,
        setPageData, setPageId, setPageMetadata,
        remove, edit, serialize, editData,
        toggle, setToggle, css, setCss, font, setFont,
        pageCache, setPageCache, clipboard, setClipboard
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
        <div className='grid grid-rows-[minmax(0,_1fr)] m-2'>

            <Helmet>
                <title>idyle - Editor</title>
                <meta name="description" content="Editor" />
                <meta name="keywords" content="Editor" />
                <link rel="canonical" href="/editor" />
            </Helmet>

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