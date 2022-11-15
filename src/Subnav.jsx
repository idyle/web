import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';

const Subnav =  ({ children }) => {
    return (
        <div className="grid rounded-lg w-full bg-black p-1 flex items-center justify-items-center">
            <div className="grid grid-flow-col gap-3">

            <div className="flex no-select gap-1 border-b-[1px] items-center">
                <AiOutlineDrag color="white" size="20px" />
            <h1 className="text-xl text-white ">Canvas</h1>
            </div>
            <div className="flex no-select gap-1 border-b-[1px] border-black hover:border-red-200 items-center text-white hover:text-red-200">
            <FaCode color="inherit" size="20px" />
            <h1 className="text-xl text-inherit">Codebase</h1>
            </div>

            <div className="flex no-select gap-1 border-b-[1px] border-black items-center">
            <MdPages color="white" size="20px" />
            <h1 className="text-xl text-white ">Pages</h1>
            </div>
            
            </div>
            


        </div>


    )
};

export default Subnav;