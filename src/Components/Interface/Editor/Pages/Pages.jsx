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
    const { notify, prompt, spin } = useUtil();

    const config = { name: 'New Page', route: 'newpage', data: {
        component: 'div',
        id: '0',
        className: 'flex flex-col flex-wrap h-full w-full max-w-full max-h-full overflow-hidden',
        children: []
    } };

    const createNewPage = async () => {
        const pageName = await prompt('', 'Input a page name');
        if (!pageName) return;
        const routeIndex = pages.findIndex(({ route }) => route === pageName);
        if (routeIndex >= 0) return notify('This route already exists.');
        spin(true);
        const token = await getToken();
        const newPage = { ...config, route: pageName };
        const operation = await createPage(token, newPage);
        spin(false);
        if (!operation) return notify('Something went wrong trying to create the page');
        setPages([ ...pages, { ...newPage, id: operation?.id }]);
    };

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] auto-rows-min p-2 gap-2">
            <div className="flex w-full place-content-center items-center p-4">
                <h1 className="text-6xl text-gunmetal text-center font-bold">Your Pages</h1>
            </div>

            <div className="grid auto-rows-min md:grid-cols-3 gap-3 px-5 justify-items-center items-center md:overflow-auto">
                <div onClick={createNewPage} className="grid w-full h-full items-center justify-items-center text-gunmetal border-2 border-gunmetal rounded-lg select-none hover:bg-black/10">
                    <div className="grid items-center justify-items-center p-2">
                        <MdAddCircle size="60px" />
                        <h1 className="text-5xl text-center">Create a Page</h1>
                    </div>
                </div>
                {pages.map((page, i) => (<Page key={`p${i}`} page={page} />))}
            </div>

        </div>
    )
};

export default Pages;