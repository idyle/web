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
            <div onClick={() => setMobileClicked(true)} className="absolute right-1 top-[1px] md:hidden">
                <BiMenu size="35px" />
            </div>

            <div className={`${mobileClicked ? 'h-screen' : 'hidden'} top-0 left-0 right-0 md:block absolute md:static md:h-auto md:w-auto`}>
    
                <div onClick={() => setMobileClicked(false)} className="absolute right-1 top-[1px] md:hidden">
                    <BiX size="35px" />
                </div>

                <div className="grid gap-y-[1px] w-full bg-white p-1 flex items-center justify-items-center">

                    <div className="grid grid-flow-row md:grid-flow-col gap-2 items-center justify-items-center">
                        <h1 className="text-3xl text-black font-bold select-none">idyle</h1>
                        <Search />
                    </div>

                    <div className="grid w-[20rem] md:w-auto md:grid-cols-6 grid-cols-1 gap-1 items-center justify-items-center">
    
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