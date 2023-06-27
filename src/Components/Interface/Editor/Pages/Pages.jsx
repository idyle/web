import { MdAddCircle } from 'react-icons/md';
import { useEditor } from '../Editor';
import Page from './Page';
import { useUtil } from '../../../../Contexts/Util';
import { useState } from 'react';
import { createPage } from '../requests';
import { useAuth } from '../../../../Contexts/Auth';

const Pages = () => {

    const { getToken } = useAuth();
    const { pages, setPages } = useEditor();
    const { notify, prompt, load } = useUtil();

    const config = { name: 'New Page', route: 'newpage', data: {
        component: 'div',
        id: '0',
        className: '',
        children: []
    } };

    // const [addPageMode, setAddPageMode] = useState(false);
    // const addPage = () => setAddPageMode(true);

    // const editPage = (page) => {
    //     // an edit already sets regardless
    //     if (addPageMode) setAddPageMode(false);
    //     if (page?.route === config?.route) return notify('Please change the route');
    //     const routeIndex = pages.findIndex(({ route }) => route === page?.route);
    //     const pageIndex = pages.findIndex(({ id }) => id === page?.id);
    //     if (routeIndex >= 0 && pageIndex !== routeIndex) return notify('This route already exists.');
    //     let arr = pages;
    //     if (addPageMode) arr.push(page);
    //     else arr[pageIndex] = page;
    //     setPages([ ...arr ]);
    //     save(page);
    // };

    const createNewPage = async () => {
        const pageName = await prompt('', 'Input a page name');
        if (!pageName) return;
        const routeIndex = pages.findIndex(({ route }) => route === pageName);
        if (routeIndex >= 0) return notify('This route already exists.');
        load(true);
        const token = await getToken();
        const newPage = { ...config, route: pageName };
        const operation = await createPage(token, newPage);
        load(false);
        if (!operation) return notify('Something went wrong trying to create the page');
        setPages([ ...pages, { ...newPage, id: operation?.id }]);
    };

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] auto-rows-min p-2 gap-2">
            <div className="flex w-full place-content-center items-center p-2 gap-1">
                <h1 className="text-7xl text-gunmetal text-center font-bold">Your Pages</h1>
                <div onClick={createNewPage} className="flex items-center text-gunmetal place-content-center rounded-lg select-none hover:scale-[.95]">
                    <MdAddCircle size="50px" />
                </div>
            </div>

            <div className="grid auto-rows-min md:grid-cols-3 gap-3 px-5 justify-items-center items-center md:overflow-auto">
                {/* { addPageMode && <Page page={config} editPage={editPage} addMode={addPageMode} setAddMode={setAddPageMode} /> } */}
                {pages.map((page, i) => (<Page key={`p${i}`} page={page} />))}
            </div>

        </div>
    )
};

export default Pages;