import { MdAddCircle } from 'react-icons/md';
import { useEditor } from '../Editor';
import Page from './Page';
import { useUtil } from '../../Contexts/Util';
import { useAuth } from '../../Contexts/Auth';
import { listPages } from '../requests';
import { useEffect } from 'react';
import { useState } from 'react';

const Pages = () => {

    const { pages, setPages, save, remove } = useEditor();
    const { notify, setLoader } = useUtil();

    const { user } = useAuth();

    const config = { name: 'New Page', route: 'newpage', data: {
        component: 'div',
        id: '0',
        className: '',
        children: []
    } };

    const [addPageMode, setAddPageMode] = useState(false);

    const addPageOLD = async () => {
        if (pages.find(({ route }) => route === config.route)) return;
        setPages([ ...pages, config ]);
    };

    const addPage = () => setAddPageMode(true);

    const editPage = (page) => {
        // an edit already sets regardless
        if (addPageMode) setAddPageMode(false);
        if (page?.route === config?.route) return notify('Please change the route');
        console.log(page);
        save(page);
        const index = pages.findIndex(({ route }) => route === page?.route);
        console.log('index of pages', index);
        if (!(index >= 0)) return setPages([ ...pages, page ]);
        pages[index] = page;
        setPages([ ...pages ]);
    };

    // const removePage = async (page) => {
    //     remove(page);
    //     setPages(pages.filter(({ route }) => route !== page?.route ));
    // };

    return (
        <div className="grid auto-rows-min">
            <div className="grid justify-items-center gap-3 p-2">
                <h1 className="text-6xl">Your Pages</h1>
                <h1 className="text-4xl">Click on a page to get started.</h1>
                <div onClick={addPage} className="flex items-center border-black border rounded-lg select-none p-3 gap-x-1 hover:scale-[.98]">
                    <MdAddCircle size="30px" />
                    <h1 className="text-4xl">Add a New Page</h1>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 px-5 justify-items-center items-center">
                {pages.map((page, i) => (<Page key={`p${i}`} page={page} editPage={editPage} />))}
                { addPageMode && <Page page={config} editPage={editPage} addMode={addPageMode} /> }
            </div>

        </div>
    )
};

export default Pages;