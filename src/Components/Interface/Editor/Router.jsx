import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Canvas from './Canvas/Canvas';
import Codebase from './Codebase/Codebase';
import { useEffect, useState } from "react";
import { useEditor } from "./Editor";
import { useUtil } from "../../../Contexts/Util";

const Router = () => {

    const params = useParams();
    const [ queries, setQueries ] = useSearchParams();
    const [query, setQuery] = useState('');
    const { integrator } = useUtil();
    const { pages, pageId, setPageId, setPage, page } = useEditor();
    const navigate = useNavigate();
    const { pathname: path } = useLocation();

    useEffect(() => {
        if (!pages.length) return;
        // if we have no params at the moment
        const paramsRoute = pages?.find(( { id }) => id === pageId)?.route;
        // access route
        if (paramsRoute === params?.['*']) return; 
        // if routes are not same
        const paramsPage = pages?.find(( { route }) => route === params?.['*']);
        if (!paramsPage?.id) if (path !== '/editor/pages' || path !== '/editor') return navigate('/editor/pages');
        setPageId(paramsPage?.id);
        if (!integrator?.active) setPage({ ...paramsPage });
    }, [pages]);

    useEffect(() => {
        if (!params['*']) if (path !== '/editor/pages' || path !== '/editor') return navigate('/editor/pages');
        let query = queries?.get('mode');
        if (query) return setQuery(query);
        setQueries({ mode: 'canvas' });
        setQuery('canvas');
    }, [params, queries]);

    return (<>{(query === 'codebase') ? <Codebase /> : <Canvas />}</>)
};

export default Router;