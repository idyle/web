import { IoPersonCircle, IoPersonCircleOutline, IoRocket, IoRocketOutline } from 'react-icons/io5';
import { MdOutlineBuild, MdBuild, MdOutlinePermMedia, MdPermMedia } from 'react-icons/md';
import { HiCreditCard, HiOutlineCreditCard, HiDatabase, HiOutlineDatabase } from 'react-icons/hi';
import { BiSearch, BiMenu, BiX } from 'react-icons/bi';

import { signOut, getAuth } from 'firebase/auth';

import { useState } from 'react';

const Navigator = () => {

    const [mobileClicked, setMobileClicked] = useState(false);
    const signOutUser = () => {
        console.log('logged out');
        signOut(getAuth());
    };
    
    return (
        <>
        <div onClick={() => setMobileClicked(true)} className="absolute right-1 top-[1px] md:hidden">
            <BiMenu size="35px" />
        </div>

        <div className={` ${mobileClicked ? 'h-screen' : 'hidden'} top-0 left-0 right-0 md:block absolute md:static md:h-auto md:w-auto`}>
        
        <div onClick={() => setMobileClicked(false)} className="absolute right-1 top-[1px] md:hidden">
            <BiX size="35px" />
        </div>

        <div className="grid gap-y-[1px] w-full bg-white p-1 flex items-center justify-items-center">

            <div className="grid grid-flow-row md:grid-flow-col gap-2 items-center justify-items-center">
                <h1 className="text-3xl text-black font-bold">idyle</h1>
                {/* convert to input box, use absolute/fixed + offset for results drop */}
                <div className="flex gap-1 h-[2rem] w-[20rem] border p-2 rounded-lg border-black items-center">
                    <BiSearch color="black" size="10px"/>
                    <h1 className="text-lg text-black">Search</h1>
                </div>
            </div>

            <div className="grid w-[20rem] md:w-auto md:grid-cols-6 grid-cols-1 gap-1 items-center justify-items-center">
                
                <div onClick={signOutUser} className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-1 items-center">
                        <IoPersonCircleOutline color="black" size="25px" />
                        <h1 className='text-xl text-black font-semibold'>Accounts</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center transition animate-fadein duration-300">
                    <div className="flex gap-1 h-[2rem] p-1 items-center">
                        <HiOutlineCreditCard color="black" size="25px" />
                        <h1 className='text-xl text-black font-semibold'>Payments</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-1 items-center">
                        <MdOutlineBuild color="black" size="25px" />
                        <h1 className='text-xl text-black font-semibold'>Editor</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-1 items-center">
                        <IoRocketOutline color="black" size="25px" />
                        <h1 className='text-xl text-black font-semibold'>Deployer</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-1 items-center">
                        <MdOutlinePermMedia color="black" size="25px" />
                        <h1 className='text-xl text-black font-semibold'>Objects</h1>
                    </div>
                </div>

                <div className="flex w-full border rounded-lg border-black place-content-center">
                    <div className="flex gap-1 h-[2rem] p-1 items-center">
                        <HiOutlineDatabase color="black" size="25px" />
                        <h1 className='text-xl text-black font-semibold'>Docs</h1>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default Navigator;