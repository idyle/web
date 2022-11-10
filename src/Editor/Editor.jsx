import { HiCreditCard, HiOutlineCreditCard, HiDatabase, HiOutlineDatabase } from 'react-icons/hi';
import Website from './Develop/Website';
import Text from './Develop/Develop.jsx';
import DND from './Design/Main';

const Editor = () => {
    return (
        <div className='grid grid-rows-[10%_90%]'>
        <div className="grid gap-y-[1px] w-full bg-white p-1 flex items-center justify-items-center">
            <div className="grid grid-cols-3 gap-1 items-center justify-items-center">

                <div  className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-3 items-center">
                        <HiOutlineCreditCard color="black" size="30px" />
                        <h1 className='text-2xl text-black font-semibold'>Design</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center transition animate-fadein duration-300">
                    <div className="flex gap-1 h-[2rem] p-3 items-center">
                        <HiOutlineCreditCard color="black" size="30px" />
                        <h1 className='text-2xl text-black font-semibold'>Develop</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-3 items-center">
                        <HiOutlineCreditCard color="black" size="30px" />
                        <h1 className='text-2xl text-black font-semibold'>Form</h1>
                    </div>
                </div>
            </div>
        </div>

        {/* <div className="grid drop-shadow-2xl overflow-hidden rounded-lg m-2 w-[45%]">
        <Text />
        </div> */}

        <DND />
        </div>

    )
};

export default Editor;