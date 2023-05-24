import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Canvas from './Canvas/Canvas';
import Codebase from './Codebase/Codebase';
import { useEffect, useState } from "react";
import { useEditor } from "./Editor";

const Router = () => {

    const params = useParams();
    const [ queries, setQueries ] = useSearchParams();
    const [query, setQuery] = useState('');
    const { pages, pageId, setPageId, setPage } = useEditor();
    const navigate = useNavigate();

    useEffect(() => {
        if (!pages.length) return;
        // if we have no params at the moment
        console.log(pageId, 'page id', pages, 'pages');
        // access route
        const paramsRoute = pages?.find(( { id }) => id === pageId)?.route;
        console.log(paramsRoute, 'params ROute', params?.['*'], 'axtual prarms');
        if (paramsRoute === params?.['*']) return console.log('true'); 
        
        // if routes are not same

        const paramsPage = pages?.find(( { route }) => route === params?.['*']);
        console.log('params page', paramsPage);
        if (!paramsPage?.id) return navigate('/editor/pages');
        console.log('setting the page', paramsPage?.route);
        setPageId(paramsPage?.id);
        setPage({ ...paramsPage });

    }, [pages]);

    useEffect(() => {
        if (!params['*']) return;
        let query = queries?.get('mode');
        if (query) return setQuery(query);
        setQueries({ mode: 'canvas' });
        setQuery('canvas');
    }, [params, queries]);

    return (
        <>{(query === 'codebase') ? <Codebase /> : <Canvas />}</>
    )
};

export default Router;