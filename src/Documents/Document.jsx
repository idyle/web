import { AiOutlineRight } from 'react-icons/ai';

const Document = () => {
    return (
        <div className="flex items-center border-b-2 border-black justify-between p-1 select-none hover:bg-gray-200">
            <h1 className="text-3xl justify-self-start text-inherit">Document</h1>
            <AiOutlineRight className="text-inherit" size="30px" />
        </div>
    )
};

export default Document;