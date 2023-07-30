import { AiFillCopy, AiOutlineDownload, AiOutlineDelete, AiOutlineFile, AiOutlineGlobal, AiFillLock } from 'react-icons/ai'
import { useAuth } from "../../../Contexts/Auth";
import { useUtil } from "../../../Contexts/Util";
import { deleteFile, downloadFile, getFile, publicFile } from './requests';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../Contexts/Data';

const Object = ({ object, objects, setObjects }) => {

    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { resetObjects } = useData();
    const { notify, confirm, load, integrator, setIntegrator } = useUtil();

    const copy = async () => {
        let file = object;
        if (!object?.public) {
            load(true);
            const token = await getToken();
            file = await getFile(token, object?.name);
            load(false);
        };
        if (!file) return notify('Could not get the file url.');
        notify('Successfully copied to clipboard');
        navigator.clipboard.writeText(file.url);
    };

    const download = async () => {
        load(true);
        const token = await getToken();
        const file = await downloadFile(token, object.name);
        load(false);
        if (!file) return;
        const data = Uint8Array.from(file.data);
        const content = new Blob([data.buffer], { type: object.type });
        const encodedUri = window.URL.createObjectURL(content);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", object.name);    
        link.click();
    };

    const remove = async () => {
        load(true);
        const token = await getToken();
        const op = await deleteFile(token, object.name);
        load(false);
        if (!op) return notify('Something went wrong...');
        setObjects(objects.filter(( { name }) => name !== object.name));
    };

    const integrationMode = (integrator?.active && integrator?.target === 'objects') ? `hover:bg-blue/50 select-none` : '';

    const sendFile = async () => {
        // send data back
        if (!integrator?.active || integrator?.target !== 'objects' || !integrator?.origin) return;
        if (!object?.public) {
            if (!(await confirm('Adding this to the canvas will make your file public. Continue?'))) return;
            const token = await getToken();
            load(true);
            const operation = await publicFile(token, object?.name);
            load(false);
            if (!operation) return;
        };
        const url = `https://cdn.idyle.app/${object?.path}`;
        setIntegrator({ ...integrator, data: { ...object, url } });
        navigate(integrator?.origin);
    };

    const makePublic = async () => {
        if (!(await confirm('This will make your file public. Continue?'))) return;
        const token = await getToken();
        load(true);
        const operation = await publicFile(token, object?.name);
        load(false);
        if (!operation) return;
        resetObjects();
    };

    return (
        <div onClick={sendFile} className={`grid grid-cols-2 md:grid-cols-4 items-center justify-items-center shadow-black shadow-sm rounded-lg p-2 text-gunmetal ${integrationMode}`}>
            <AiOutlineFile className="block md:hidden" size="50px" />
            <h1 className="text-2xl text-center break-all">{object.name}</h1>
            <h1 className="text-2xl text-center break-all">{object.type}</h1>
            <div onClick={copy} className="flex items-center border border-gunmetal select-none p-1 gap-1 rounded-lg hover:bg-gunmetal hover:text-white">
                <AiFillCopy size="15px" />
                <h1 className="text-xl">Copy Link</h1>
            </div>
            <div className="flex items-center gap-1">
                <AiOutlineDownload onClick={download} size="30px" />
                <AiOutlineDelete onClick={remove} size="30px" />
                { object?.public ? <AiOutlineGlobal size="30px" /> : <AiFillLock size="30px" onClick={makePublic} /> }
  
            </div>
        </div>
    )
};

export default Object;