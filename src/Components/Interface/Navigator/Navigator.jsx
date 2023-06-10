import { IoPersonCircle, IoPersonCircleOutline, IoRocket, IoRocketOutline } from 'react-icons/io5';
import { MdOutlineBuild, MdBuild, MdOutlinePermMedia, MdPermMedia } from 'react-icons/md';
import { HiCreditCard, HiOutlineCreditCard, HiDatabase, HiOutlineDatabase } from 'react-icons/hi';
import { BiMenu, BiX } from 'react-icons/bi';
import Navbutton from '../Templates/Navbutton';
import { useState } from 'react';
import Search from './Search';

const Navigator = () => {

    const [mobileClicked, setMobileClicked] = useState(false);
    
    return (
        <div>

            <div className="grid w-full grid-flow-col justify-between md:justify-center px-4 md:p-0">
                <div className="grid grid-flow-col w-full gap-2 items-center justify-items-center relative">
                        <h1 className="text-3xl md:text-3xl text-black font-bold select-none">idyle</h1>
                        <Search />
                </div>
                <BiMenu onClick={() => setMobileClicked(true)} className="md:hidden relative" size="45px" />
            </div>

            <div className={`${mobileClicked ? 'h-full' : 'hidden'} top-0 left-0 right-0 md:block absolute md:static md:h-auto md:w-auto z-50`}>
    
                <div onClick={() => setMobileClicked(false)} className="absolute right-1 top-[1px] md:hidden">
                    <BiX size="45px" />
                </div>

                <div className="grid auto-rows-min h-full gap-y-[1px] w-full bg-white p-1 flex items-center justify-items-center md:h-auto">

                    <div className={`${mobileClicked ? 'block ' : 'hidden'} grid grid-flow-row py-5 md:py-0 md:grid-flow-col gap-2 items-center justify-items-center `}>
                        <h1 className="text-7xl md:text-3xl text-black font-bold select-none">idyle</h1>
                    </div>

                    <div className="grid w-[20rem] md:w-auto md:grid-cols-6 grid-cols-1 gap-3 md:gap-1 items-center justify-items-center">
    
                        <Navbutton icon={<IoPersonCircleOutline/>} text="Accounts" route='/accounts'/>
                        <Navbutton icon={<HiOutlineCreditCard/>} text="Payments" route='/payments'/>
                        <Navbutton icon={<MdOutlineBuild/>} text="Editor" route='/editor'/>
                        <Navbutton icon={<IoRocketOutline/>} text="Deployer" route='/deployer'/>
                        <Navbutton icon={<MdOutlinePermMedia/>} text="Objects" route='/objects'/>
                        <Navbutton icon={<HiOutlineDatabase/>} text="Docs" route='/docs'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigator;