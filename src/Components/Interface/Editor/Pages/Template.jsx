import { BiLinkExternal, BiCopy } from 'react-icons/bi';
import { MdPages } from 'react-icons/md';
import { useEditor } from '../Editor';
import { useUtil } from '../../../../Contexts/Util';
import { useAuth } from '../../../../Contexts/Auth';
import { createPage } from '../requests';

const Page = ({ template }) => {

    const { getToken } = useAuth();
    const { pages, setPages } = useEditor();
    const { notify, prompt, spin } = useUtil();

    const copy = async () => {
        const pageName = await prompt(template?.route || '', 'Input a page route. You can change the page name later on.');
        if (!pageName) return;
        const routeIndex = pages.findIndex(({ route }) => route === pageName);
        if (/\s/g.test(pageName)) return notify('Routes cannot include whitespaces.');
        if (routeIndex >= 0) return notify('This route already exists.');
        spin(true);
        const token = await getToken();
        const newPage = { ...template, route: pageName };
        const operation = await createPage(token, newPage);
        spin(false);
        if (!operation) return notify('Something went wrong trying to create the page');
        setPages([ ...pages, { ...newPage, id: operation?.id }]);
    };

    const view = () => window.open(`https://www.idyle.app/${template?.route}`, '_blank');

    return (
        <div className={`grid w-full items-center justify-items-center border-2 border-gunmetal text-gunmetal p-6 gap-3 rounded-xl`}>
            <div className="grid items-center justify-items-center gap-2">
                <div  className="flex items-center hover:bg-blue/20 rounded-lg">
                    <MdPages size="40px" /> 
                    <h1 className="text-4xl">Templates</h1>
                </div>
                <h1 className="text-5xl text-inherit text-center outline-none font-bold">{template?.name}</h1>
            </div>

            <div className="grid gap-3">
                <div onClick={view} className={`flex items-center place-content-center gap-1 p-2 border border-gunmetal text-gunmetal rounded-lg select-none hover:scale-[.98]`}>
                    <BiLinkExternal size="25px" />
                    <h1 className="text-2xl">View sample</h1>
                </div>
                <div onClick={copy} className={`flex items-center place-content-center gap-1 p-2 border border-gunmetal text-gunmetal rounded-lg select-none hover:scale-[.98]`}>
                    <BiCopy size="25px" />
                    <h1 className="text-2xl">Make a copy</h1>
                </div>
            </div> 
        </div>
    )
};

export default Page;