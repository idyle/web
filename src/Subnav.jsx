import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 

const Subnav =  ({ children }) => {
    return (
        <div className="grid rounded-xl bg-black w-full bg-white p-1 flex items-center justify-items-center">
            <div className="grid grid-flow-col gap-3">

            <div className="flex gap-1 border-b-[1px] items-center">
                <AiOutlineDrag color="white" size="20px" />
            <h1 className="text-xl text-white ">Canvas</h1>
            </div>
            <div className="flex gap-1 border-b-[1px] items-center">
            <FaCode color="white" size="20px" />
            <h1 className="text-xl text-white ">Cobdease</h1>
            </div>

            <div className="border-b-[1px]">
            <h1 className="text-xl text-white ">Pages</h1>
            </div>
            
            </div>
            


        </div>


    )
};

export default Subnav;