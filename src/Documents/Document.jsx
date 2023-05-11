import { AiOutlineRight } from 'react-icons/ai';
import { useUtil } from '../Contexts/Util';
import { useNavigate } from 'react-router-dom';

const Document = ({ doc, onClick, currentDoc }) => {

    const navigate = useNavigate();
    const { integrator, setIntegrator } = useUtil();
    const color = currentDoc?.id === doc?.id && 'bg-gray-200';
    const integrationMode = (integrator?.active && integrator?.target === 'docs') ? `hover:bg-blue-300/50 select-none` : '';

    const sendDoc = (e) => {
        if (!integrator?.active || integrator?.target !== 'docs' || !integrator?.origin) return onClick(e);
        setIntegrator({ ...integrator, data: doc });
        navigate(integrator?.origin);
    };

    return (
        <div id={doc?.id} onClick={sendDoc} className={`flex items-center border-b-2 border-black justify-between p-1 select-none rounded-lg hover:bg-gray-200 ${color} ${integrationMode}`}>
            <h1 className="text-3xl justify-self-start text-inherit">{doc.id}</h1>
            <AiOutlineRight className="text-inherit" size="30px" />
        </div>
    )
};

export default Document;