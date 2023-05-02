import { useState } from 'react';
import { MdEdit, MdDelete, MdCheck, MdCancel } from 'react-icons/md';
import { useEditor } from '../Editor';
import { useUtil } from '../../Contexts/Util';
import { useNavigate } from 'react-router-dom';

const Page = ({ page, editPage, addMode, setAddMode }) => {
    const { remove, page: selectedPage, setPage } = useEditor();
    const { integrator, setIntegrator } = useUtil();
    const navigate = useNavigate();

    const sendPage = () => {
        setIntegrator({ ...integrator, data: page });
        navigate('/deployer');
    };

    const onClick = async () => {
        if (addMode) return;
        if (integrator?.active && integrator?.target === 'editor/pages') return sendPage();
        
        setPage(page);
    };
    console.log('selected', selectedPage, page);
    const color = `${(selectedPage?.id === page.id && !addMode) ? 'bg-black text-white' : 'border border-black text-black'}`;
    const border = `${(selectedPage?.id === page.id && !addMode) ? 'border border-white text-white' : 'border border-black text-black'}`;
    const integrationMode = (integrator?.active && integrator?.target === 'editor/pages') ? `hover:bg-blue-300/50 select-none` : '';

    const [name, setName] = useState(page.name);
    const [route, setRoute] = useState(page.route);

    const [editName, setEditName] = useState(false);
    const [editRoute, setEditRoute] = useState(false);

    const onRouteEdit = (e) => {
        setEditRoute(false);
        editPage({ ...page, route })
    };

    const onNameEdit = (e) => {
        setEditName(false);
        editPage({ ...page, name });
    };

    const onRouteChange = (e) => setRoute(e.target.value); 
    const onNameChange = (e) => setName(e.target.value);

    const removePage = () => remove(page);

    const canvas = async () => {
        onClick();
        navigate('/editor/canvas');
    };

    const code = () => {
        onClick();
        navigate('/editor/codebase');
    };  

    const cancel = () => setAddMode(false);

    return (
        <div className={`grid w-full items-center justify-items-center ${color} p-6 gap-3 rounded-xl ${integrationMode}`}>
            <div className="grid items-center justify-items-center gap-2">
                { !addMode ? <div className="flex items-center place-content-center gap-2">
                    { editName?
                    <input autoFocus className={`text-center ${color} text-4xl rounded-lg w-full`} onChange={onNameChange} value={name}/>
                    : <h1 className="text-5xl text-inherit text-center">{page?.name}</h1>
                    }

                    { editName ? <MdCheck onClick={onNameEdit} className='text-inherit' size="25px" /> 
                    : <MdEdit onClick={() => setEditName(true)} className="text-inherit" size="25px" /> 
                    } 
                </div> : <h1 className="text-5xl text-inherit text-center">{page?.name}</h1> }
                <div className="flex items-center place-content-center gap-2">
                    { editRoute ?
                    <input autoFocus className={`text-center ${color} text-2xl rounded-lg w-full`} onChange={onRouteChange} value={route}/>
                    : <h1 className="text-3xl text-center text-inherit">/{page?.route}</h1>
                    }
        
                    { editRoute ? <MdCheck onClick={onRouteEdit} className='text-inherit' size="25px" /> 
                    : <MdEdit onClick={() => setEditRoute(true)} className="text-inherit" size="25px" /> 
                    }
                </div>
            </div>

            { !addMode && <div className="flex items-center gap-1">
                <div onClick={canvas} className={`flex items-center place-content-center p-1 ${border} rounded-lg select-none hover:scale-[.98]`}>
                    <h1 className="text-xl">Canvas</h1>
                </div>
                <div onClick={code} className={`flex items-center place-content-center p-1 ${border} rounded-lg select-none hover:scale-[.98]`}>
                    <h1 className="text-xl">Codebase</h1>
                </div>
            </div> }

            {
                !addMode && 
                <div className="flex items-center gap-1">
                    <MdCheck onClick={onClick} size="25px" />
                    <MdDelete onClick={removePage} size="25px" />
                </div>
            }

            {
                addMode &&
                <div className="grid items-center justify-items-center">
                    <h1 className="text-2xl text-center italic">Edit the route of this page.</h1>
                    <MdCancel onClick={cancel} size="25px" />
                </div>
            }
        </div>
    )
};

export default Page;