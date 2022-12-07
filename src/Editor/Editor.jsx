import { AiOutlineDrag } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa'; 
import { MdPages } from 'react-icons/md';
import Subnav from '../Templates/Subnav';
import Subnavbutton from '../Templates/Subnavbutton';
import Canvas from './Canvas/Canvas';

const Editor = () => {
    return (
        <div className='grid grid-rows-[auto_minmax(0,_1fr)]'>
            <div className="grid w-full bg-white p-1 flex items-center justify-items-center">
                <Subnav>
                    <Subnavbutton icon={<FaCode />} text="Codebase" />
                    <Subnavbutton icon={<AiOutlineDrag />} text="Canvas" />
                    <Subnavbutton icon={<MdPages />} text="Pages" />
                </Subnav>
            </div>
            <Canvas/>
        </div>
    )
};

export default Editor;