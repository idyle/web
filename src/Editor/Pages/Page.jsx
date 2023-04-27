import { useState } from 'react';
import { MdEdit, MdDelete, MdCheck } from 'react-icons/md';
import { useEditor } from '../Editor';
import { useUtil } from '../../Contexts/Util';
import { useNavigate } from 'react-router-dom';

const Page = ({ page, editPage, addMode}) => {
    const { setPageRoute, pageRoute, remove } = useEditor();
    const { integrator, setIntegrator } = useUtil();
    const navigate = useNavigate();

    const sendPage = () => {
        setIntegrator({ ...integrator, data: page });
        navigate('/deployer');
    };

    const onClick = () => {
        if (addMode) return;
        if (integrator?.active && integrator?.target === 'editor/pages') return sendPage();
        setPageRoute(page.route)
    };

    const color = `${pageRoute === page.route ? 'bg-black text-white' : 'border border-black text-black'}`;
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

    return (
        <div onClick={onClick} className={`grid w-full items-center justify-items-center ${color} p-6 gap-3 rounded-lg ${integrationMode}`}>
            <div className="grid items-center justify-items-center gap-2">
                <div className="flex items-center place-content-center gap-2">
                    { editName ?
                    <input autoFocus className={`text-center ${color} text-5xl rounded-lg w-1/2`} onChange={onNameChange} value={name}/>
                    : <h1 className="text-5xl text-inherit text-center">{name}</h1>
                    }

                    { editName ? <MdCheck onClick={onNameEdit} className='text-inherit' size="30px" /> 
                    : <MdEdit onClick={() => setEditName(true)} className="text-inherit" size="20px" /> 
                    }
                </div>
                <div className="flex items-center place-content-center gap-2">
                    { editRoute ?
                    <input autoFocus className={`text-center ${color} text-3xl rounded-lg w-1/2`} onChange={onRouteChange} value={route}/>
                    : <h1 className="text-3xl text-center text-inherit">/{route}</h1>
                    }
        
                    { editRoute ? <MdCheck onClick={onRouteEdit} className='text-inherit' size="20px" /> 
                    : <MdEdit onClick={() => setEditRoute(true)} className="text-inherit" size="20px" /> 
                    }
                </div>
            </div>
            { !addMode && <MdDelete onClick={removePage} size="30px" /> }
        </div>
    )
};

export default Page;