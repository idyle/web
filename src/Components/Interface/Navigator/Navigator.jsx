import { IoPersonCircleOutline, IoRocketOutline } from 'react-icons/io5';
import { MdOutlineBuild, MdOutlinePermMedia } from 'react-icons/md';
import { HiOutlineCreditCard, HiOutlineDatabase } from 'react-icons/hi';
import { BiMenu, BiX, BiHelpCircle } from 'react-icons/bi';
import Navbutton from '../Templates/Navbutton';
import { useState } from 'react';
import Search from './Search';

const Navigator = () => {

    const [mobileClicked, setMobileClicked] = useState(false);
    
    return (
        <div className="p-2 gap-1">

            <div className="flex place-content-center items-center gap-x-2 px-4">
                <h1 className="text-3xl md:text-2xl text-black font-bold select-none md:justify-self-end">idyle</h1>
                <Search />

                <BiMenu onClick={() => setMobileClicked(true)} className="md:hidden relative" size="45px" />
                <BiHelpCircle onClick={() => window.open(`https://support.idyle.app`, '_blank')} className="hidden md:block relative hover:bg-black/10 rounded-full" size="25px" />
            </div>

            {/* <div className="grid w-full grid-flow-col justify-between md:justify-normal items-center gap-x-2 px-4 md:px-[30rem]">
                <h1 className="text-3xl md:text-2xl text-black font-bold select-none md:justify-self-end">idyle</h1>
                <Search />
                <BiMenu onClick={() => setMobileClicked(true)} className="md:hidden relative" size="45px" />
                <BiHelpCircle onClick={() => window.open(`https://support.idyle.app`, '_blank')} className="hidden md:block relative hover:bg-black/10 rounded-full" size="25px" />
            </div>  */}

            <div className={`${mobileClicked ? 'h-full' : 'hidden'} top-0 left-0 right-0 fixed md:block md:static md:h-auto md:w-auto z-50`}>
    
                <div onClick={() => setMobileClicked(false)} className="absolute right-3 top-2 md:hidden">
                    <BiX size="45px" />
                </div>

                <div className="grid auto-rows-min h-full gap-y-[1px] w-full bg-white p-1 flex items-center justify-items-center md:h-auto">

                    <div className={`${mobileClicked ? 'block ' : 'hidden'} grid grid-flow-row py-5 md:py-0 md:grid-flow-col gap-2 items-center justify-items-center `}>
                        <h1 className="text-7xl md:text-3xl text-black font-bold select-none block md:hidden">idyle</h1>
                    </div>

                    <div className="grid md:grid-flow-col gap-3 md:gap-0.5">
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