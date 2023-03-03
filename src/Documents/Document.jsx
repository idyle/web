import { AiOutlineRight } from 'react-icons/ai';

const Document = ({ doc, onClick, currentDoc }) => {

    const color = currentDoc?.id === doc?.id && 'bg-gray-200';

    return (
        <div id={doc?.id} onClick={onClick} className={`flex items-center border-b-2 border-black justify-between p-1 select-none rounded-lg hover:bg-gray-200 ${color}`}>
            <h1 className="text-3xl justify-self-start text-inherit">{doc.id}</h1>
            <AiOutlineRight className="text-inherit" size="30px" />
        </div>
    )
};

export default Document;