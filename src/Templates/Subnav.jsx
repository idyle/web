import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';

const Subnav =  ({ children }) => {
    return (
        <div className="grid rounded-lg w-full bg-black p-1 flex items-center justify-items-center">
            <div className="grid grid-flow-col gap-3">

            {children}
            
            </div>
            


        </div>


    )
};

export default Subnav;