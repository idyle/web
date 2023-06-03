import { AiFillCopy, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai'
import { useAuth } from "../../../Contexts/Auth";
import { useUtil } from "../../../Contexts/Util";
import { deleteFile, downloadFile, getFile, publicFile } from './requests';
import { useNavigate } from 'react-router-dom';

const Object = ({ object, objects, setObjects }) => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const { notify, prompt, load, integrator, setIntegrator } = useUtil();

    const copy = () => {
        notify('Successfully copied to clipboard');
        navigator.clipboard.writeText(object.url);
    };

    const download = async () => {

        load(true);
        const file = await downloadFile(user?.accessToken, object.name);
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
        const op = await deleteFile(user?.accessToken, object.name);
        load(false);
        if (!op) return notify('Something went wrong...');
        setObjects(objects.filter(( { name }) => name !== object.name));
        
    };

    const integrationMode = (integrator?.active && integrator?.target === 'objects') ? `hover:bg-blue-300/50 select-none` : '';

    const sendFile = async () => {
        // send data back
        console.log(integrator?.active, 'integrator status');
        if (!integrator?.active || integrator?.target !== 'objects' || !integrator?.origin) return;
        if (!(await prompt('Adding this to the canvas will make your file public. Continue?'))) return;
        load(true);
        const operation = await publicFile(user?.accessToken, object?.name);
        // const updatedFile = await getFile(user?.accessToken, object?.name);
        load(false);
        // if (!updatedFile) return;
        const url = `https://storage.googleapis.com/idyle/${object?.path}`;
        if (operation) setIntegrator({ ...integrator, data: { ...object, url } });
        navigate(integrator?.origin);
    };

    return (
        <div onClick={sendFile} className={`grid md:grid-cols-4 items-center justify-items-center shadow-black shadow-sm rounded-lg p-2 ${integrationMode}`}>
            <h1 className="text-2xl text-center break-all">{object.name}</h1>
            <h1 className="text-2xl">{object.type}</h1>
            <div onClick={copy} className="flex items-center border border-black select-none p-1 gap-1 rounded-lg hover:bg-black hover:text-white">
                <AiFillCopy size="15px" />
                <h1 className="text-xl">Copy Link</h1>
            </div>
            <div className="flex items-center gap-1">
                <AiOutlineDownload onClick={download} size="30px" />
                <AiOutlineDelete onClick={remove} size="30px" />
            </div>
        </div>
    )
};

export default Object;