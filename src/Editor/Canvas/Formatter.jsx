import { AiFillDelete, AiOutlineReload } from 'react-icons/ai';

const Formatter = () => {
    return (
        <div className="grid border border-black p-1 gap-1 rounded-lg">
            <h1 className="text-2xl text-center">Selected: something</h1>
            <div className="flex place-content-center items-center gap-1 p-1 bg-black rounded-lg text-white">
                <AiOutlineReload size="25px" />
                <h1 className="text-xl">Reset Styles</h1>
            </div>
            <div className="flex place-content-center items-center gap-1 p-1 bg-black rounded-lg text-white">
                <AiFillDelete size="25px" />
                <h1 className="text-xl">Delete Element</h1>
            </div>
        </div>
    )
};

export default Formatter;