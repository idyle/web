import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';
import Subnav from '../Templates/Subnav';
import Navbutton from '../Templates/Navbutton';
import Subnavbutton from '../Templates/Subnavbutton';

const Editor = () => {
    return (
        <div className='grid grid-rows-[auto_1fr]'>
            <div className="grid w-full bg-white p-1 flex items-center justify-items-center">
                <Subnav>
                    <Subnavbutton icon={<FaCode />} text="Codebase" />
                    <Subnavbutton icon={<AiOutlineDrag />} text="Canvas" />
                    <Subnavbutton icon={<MdPages />} text="Pages" />
                </Subnav>
            </div>
        </div>
    )
};

export default Editor;