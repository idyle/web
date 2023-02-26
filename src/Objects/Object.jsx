import { AiFillCopy, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai'

const Object = () => {
    return (
        <div className="grid grid-cols-4 items-center justify-items-center shadow-black shadow-sm rounded-lg py-2 ">
            <h1 className="text-2xl text-center break-all">test.png</h1>
            <h1 className="text-2xl">image/png</h1>
            <div className="flex items-center border border-black select-none p-1 gap-1 rounded-lg">
                <AiFillCopy size="15px" />
                <h1 className="text-xl">Copy Link</h1>
            </div>
            <div className="flex items-center gap-1">
                <AiOutlineDownload size="30px" />
                <AiOutlineDelete size="30px" />
            </div>
        </div>
    )
};

export default Object;