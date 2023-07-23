import { useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdPages, MdUpload } from 'react-icons/md';
import { useEditor } from '../Editor';
import { useUtil } from '../../../../Contexts/Util';
import { useLocation, useNavigate } from 'react-router-dom';

const Page = ({ page, editPage, addMode, setAddMode }) => {
    const { remove, page: selectedPage, setPage, setPageId, setPageMetadata, edit } = useEditor();
    const { integrator, setIntegrator, notify } = useUtil();
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();

    const sendPage = (e) => {
        if (!integrator?.active || integrator?.target !== 'editor/pages' || !integrator?.origin) return onClick();
        setIntegrator({ ...integrator, data: page });
        navigate(integrator?.origin);
    };

    const onClick = async () => {
        // if (addMode) return;
        setPageId(page?.id);
        setPage({ ...page });
    };

    const color = `${(selectedPage?.id === page.id) ? 'bg-gunmetal text-white' : 'border border-gunmetal text-gunmetal'}`;
    const border = `${(selectedPage?.id === page.id) ? 'border border-white text-white' : 'border border-gunmetal text-gunmetal'}`;
    const integrationMode = (integrator?.active && integrator?.target === 'editor/pages') ? `hover:bg-blue/50 hover:text-black hover:border-black hover:select-none` : '';

    const [name, setName] = useState(page.name || '');
    // const [route, setRoute] = useState(page.route || '');

    const [editName, setEditName] = useState(false);
    // const [editRoute, setEditRoute] = useState(false);

    // const onRouteEdit = (e) => {
    //     setEditRoute(false);
    //     editPage({ ...page, route })
    // };

    const onNameEdit = (e) => {
        setEditName(false);
        if (!name || page?.name === name) return;
        edit({ ...page, name });
    };

    // const onRouteChange = (e) => setRoute(e.target.value); 
    const onNameChange = (e) => setName(e.target.innerText);

    const removePage = () => remove(page);

    const canvas = async () => {
        onClick();
        navigate(`/editor/${page?.route}?mode=canvas`);
    };

    const code = () => {
        onClick();
        navigate(`/editor/${page?.route}?mode=codebase`);
    };  

    const enableEditName = () => setEditName(true);
    // const cancel = () => setAddMode(false);

    // entering
    const editFavicon = async () => {
        setIntegrator({ active: true, target: 'objects', origin });
        notify('Sending you to objects. Please select a file to add.');
        navigate('/objects');
    };

    // returning
    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'objects' || integrator?.origin !== origin) return;
        const file = integrator?.data;
        if (!file?.type?.startsWith('image')) return;
        setPageMetadata({ favicon: file?.url });
        // page data is auto set here
        setIntegrator({ active: false });
    }, [integrator?.active]);

    return (
        <div onClick={sendPage} className={`grid w-full items-center justify-items-center ${color} p-6 gap-3 rounded-xl ${integrationMode}`}>
            <div className="grid items-center justify-items-center gap-2">
                <div onClick={editFavicon} className="flex items-center hover:bg-blue/20 rounded-lg">
                    {page?.metadata?.favicon ? <img className="w-[40px] h-[40px] rounded-full" src={page?.metadata?.favicon} /> : <MdPages size="40px" /> }
                </div>
                <h1 onBlur={onNameEdit} contentEditable={editName} onDoubleClick={enableEditName} onInput={onNameChange} className="text-5xl text-inherit text-center outline-none">{page?.name}</h1>
                <h1 className="text-3xl text-center text-inherit">/{page?.route}</h1>
            </div>

            <div className="flex items-center gap-1">
                <div onClick={canvas} className={`flex items-center place-content-center p-2 ${border} rounded-lg select-none hover:scale-[.98]`}>
                    <h1 className="text-xl">Canvas</h1>
                </div>
                <div onClick={code} className={`flex items-center place-content-center p-2 ${border} rounded-lg select-none hover:scale-[.98]`}>
                    <h1 className="text-xl">Codebase</h1>
                </div>
            </div> 

            <div className="flex items-center gap-1">
                <MdEdit onClick={enableEditName} size="25px" />
                <MdUpload onClick={editFavicon} size="25px" />
                <MdDelete onClick={removePage} size="25px" />
            </div>

        </div>
    )
};

export default Page;