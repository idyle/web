import { HiCreditCard, HiOutlineCreditCard, HiDatabase, HiOutlineDatabase } from 'react-icons/hi';
import Website from './Develop/Website';
import Text from './Develop/Develop.jsx';
import DND from './Design/Main';
import Subnav from '../Subnav';
import Navbutton from '../Navbutton';

const Editor = () => {
    return (
        <div className='grid grid-rows-[auto_1fr]'>
        <div className="grid w-full bg-white p-1 flex items-center justify-items-center">
            <Subnav>
                <Navbutton>
                    <HiOutlineCreditCard color="black" size="25px" />
                    <h1 className='text-xl text-black font-semibold'>Canvas</h1>
                </Navbutton>
                <Navbutton>
                    <HiOutlineCreditCard color="black" size="25px" />
                    <h1 className='text-xl text-black font-semibold'>Codebase</h1>
                </Navbutton>
            </Subnav>
        </div>

        {/* <div className="grid drop-shadow-2xl overflow-hidden rounded-lg m-2 w-[45%]">
        <Text />
        </div> */}

        <DND />
        </div>

    )
};

export default Editor;