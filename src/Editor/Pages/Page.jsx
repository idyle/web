import { useState } from 'react';
import { MdEdit, MdDelete, MdCheck } from 'react-icons/md';
import { useEditor } from '../Editor';

const Page = ({ page }) => {
    const { setPageRoute, setPage, pageRoute, pages, setPages } = useEditor();

    const onClick = () => setPageRoute(page.route);

    const color = `${pageRoute === page.route ? 'bg-black text-white' : 'border border-black text-black'}`;

    const [name, setName] = useState(page.name);
    const [route, setRoute] = useState(page.route);

    const [editName, setEditName] = useState(false);
    const [editRoute, setEditRoute] = useState(false);

    const editPage = (obj) => {
        const index = pages.findIndex((p) => p.route === page.route);
        if (!(index >= 0)) return;
        pages[index] = { ...page, ...obj };
        setPages([...pages]);
    }

    const onRouteEdit = (e) => {
        setEditRoute(false);
        editPage({ route })
    };

    const onNameEdit = (e) => {
        setEditName(false);
        editPage({ name });
    };

    const onRouteChange = (e) => setRoute(e.target.value); 
    const onNameChange = (e) => setName(e.target.value);

    return (
        <div onClick={onClick} className={`grid w-full items-center justify-items-center ${color} p-6 gap-3 rounded-lg`}>
            <div className="grid items-center justify-items-center gap-2">
                <div className="flex items-center place-content-center gap-2">
                    { editName ?
                    <input autoFocus className={`text-center ${color} text-5xl rounded-lg w-1/2`} onChange={onNameChange} value={name}/>
                    : <h1 className="text-5xl text-inherit">{name}</h1>
                    }

                    { editName ? <MdCheck onClick={onNameEdit} className='text-inherit' size="30px" /> 
                    : <MdEdit onClick={() => setEditName(true)} className="text-inherit" size="20px" /> 
                    }
                </div>
                <div className="flex items-center place-content-center gap-2">
                    { editRoute ?
                    <input autoFocus className={`text-center ${color} text-3xl rounded-lg w-1/2`} onChange={onRouteChange} value={route}/>
                    : <h1 className="text-3xl text-inherit">{route}</h1>
                    }
        
                    { editRoute ? <MdCheck onClick={onRouteEdit} className='text-inherit' size="20px" /> 
                    : <MdEdit onClick={() => setEditRoute(true)} className="text-inherit" size="20px" /> 
                    }
                </div>
            </div>
            <MdDelete size="30px" />
        </div>
    )
};

export default Page;