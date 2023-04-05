import { IoMdFlask } from 'react-icons/io';
import { MdPages, MdClose } from 'react-icons/md';
import { HiOutlineDatabase } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';

const Labs = () => {
    return (
        <div className="grid auto-rows-min border border-black rounded-lg p-3 gap-2">
            <div className="flex items-center gap-2 p-2">
                <IoMdFlask size="40px" />
                <h1 className="text-5xl">Deploy Labs</h1>
            </div>

            <div className="flex items-center gap-2 place-content-center border border-black rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl text-center">Select Page Data from</h1>
                <MdPages size="30px" />
                <h1 className="text-4xl text-center">Pages</h1>
            </div>

            <div className="flex items-center gap-2 place-content-center border border-black rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl text-center">Select Custom Data from</h1>
                <div className="flex items-center gap-1">
                <HiOutlineDatabase size="30px" />
                <h1 className="text-4xl text-center">Docs</h1>
                </div>
            </div>

            <div className="flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center p-1 gap-1">
                    <BsThreeDots size="25px" />
                    <h1 className="text-3xl">/path/to</h1>
                </div>
                <MdClose size="25px" />
            </div>

            <div className="grid items-center justify-items-center bg-black text-white p-2 gap-1 rounded-lg">
                <h1 className="text-4xl font-bold">Convert Data</h1>
            </div>
        </div>
    )
};

export default Labs;