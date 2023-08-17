import { MdAddCircle } from 'react-icons/md';
import { useEditor } from '../Editor';
import Page from './Page';
import Template from './Template';
import { useUtil } from '../../../../Contexts/Util';
import { createPage } from '../requests';
import { useAuth } from '../../../../Contexts/Auth';
import templates from './templates';

const Pages = () => {

    const { getToken } = useAuth();
    const { pages, setPages } = useEditor();
    const { notify, prompt, spin } = useUtil();

    const config = { name: 'New Page', route: 'newpage', data: {
        component: 'div',
        id: '0',
        className: 'max-w-full w-full h-full',
        children: []
    } };

    const createNewPage = async () => {
        const pageName = await prompt('', 'Input a page route');
        if (!pageName) return;
        const routeIndex = pages.findIndex(({ route }) => route === pageName);
        if (/\s/g.test(pageName)) return notify('Routes cannot include whitespaces.');
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
        <div className="grid grid-rows-[minmax(0,_1fr)] auto-rows-min p-2 gap-2">
            {/* <div className="flex w-full place-content-center items-center p-4">
                <h1 className="text-6xl text-gunmetal text-center font-bold">Your Pages</h1>
            </div> */}

            <div className="grid auto-rows-min md:grid-cols-2 xl:grid-cols-4 gap-3 px-5 justify-items-center items-center md:overflow-auto">
                <div onClick={createNewPage} className="grid w-full h-full items-center justify-items-center text-gunmetal border-2 border-gunmetal rounded-lg select-none hover:bg-black/10">
                    <div className="grid items-center justify-items-center p-2">
                        <MdAddCircle size="60px" />
                        <h1 className="text-5xl text-center">Create</h1>
                    </div>
                </div>
                {templates.map((template, i) => (<Template template={template} key={`t${i}`} />))}
                {pages.map((page, i) => (<Page key={`p${i}`} page={page} />))}
            </div>

        </div>
    )
};

export default Pages;