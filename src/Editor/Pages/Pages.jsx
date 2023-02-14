import { MdAddCircle } from 'react-icons/md';
import { useEditor } from '../Editor';
import Page from './Page';

const Pages = () => {

    const { pages, setPages } = useEditor();

    const config = { name: 'New Page', route: '/newpage', data: {
        component: 'div',
        id: '0',
        className: '',
        children: []
    } };

    const addPage = () => {
        if (pages.find(({ route }) => route === config.route)) return;
        setPages([...pages, config]);
    };
    return (
        <div className="grid auto-rows-min">
            <div className="grid justify-items-center gap-3 p-2">
                <h1 className="text-5xl">Your Pages</h1>
                <div onClick={addPage} className="flex items-center border-black border rounded-lg select-none p-3 gap-x-1 hover:scale-[.98]">
                    <MdAddCircle size="30px" />
                    <h1 className="text-4xl">Add a New Page</h1>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 justify-items-center items-center">
                {pages.map((page) => (<Page page={page} />))}
            </div>

        </div>
    )
};

export default Pages;