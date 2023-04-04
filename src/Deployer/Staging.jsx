import { MdOutlinePermMedia, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { AiOutlineFile, AiFillDelete } from 'react-icons/ai';
import { RiGasStationFill } from 'react-icons/ri';

const Staging = () => {
    return (
        <div className="grid  bg-black text-white rounded-lg p-3 gap-2 overflow-auto">

            <div className="flex items-center gap-2 p-2">
                    <RiGasStationFill size="40px" />
                    <h1 className="text-6xl">Staging Area</h1>
                </div>

            <div className="flex items-center gap-2 place-content-center border border-white rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl">Select Files from</h1>
                <MdOutlinePermMedia size="30px" />
                <h1 className="text-4xl">Objects</h1>
            </div>

            <div className="grid rounded-lg p-2 border border-white overflow-auto">
                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <div className="flex bg-white text-black items-center place-content-center p-1 rounded-lg">
                            <h1 className="text-2xl">index</h1>
                        </div>
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonChecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                </div>

                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonUnchecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                </div>

                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonUnchecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                    
                </div>
                
                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonUnchecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                </div>
                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonUnchecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                </div>
                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonUnchecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                </div>

                <div className="flex items-center justify-between border-b-2">
                    <div className="flex items-center p-1 gap-1">
                        <AiOutlineFile size="25px" />
                        <h1 className="text-3xl">test.html</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdRadioButtonUnchecked size="25px" />
                        <AiFillDelete size="25px" />    
                    </div>
                </div>
            </div>

            <div className="grid items-center justify-items-center bg-white text-black p-2 gap-1 rounded-lg">
                <h1 className="text-4xl font-bold">Initiate Deploy</h1>
            </div>
        </div>
    )
};

export default Staging;