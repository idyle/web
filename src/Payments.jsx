import Subnavbutton from "./Templates/Subnavbutton";
import Subnav from "./Templates/Subnav";
import { MdAccountBalance } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';

const Payments = () => {
    return (
        <div className="grid grid-cols-[20%_80%] m-2">
            <Subnav type="side" mode="white">
                <Subnavbutton className="text-black" text="Balance" icon={<MdAccountBalance />} route="/accounts/profile" />
            </Subnav>
            <div className="grid grid-rows-[40%_60%]">
                <div className="grid bg-black rounded-lg p-5 items-center gap-3">
                    <div className="grid items-center gap-2">
                        <h1 className="text-white text-2xl select-none">Current Balance</h1>
                        <div className="flex gap-1 items-center">
                            <FaDollarSign className="text-white text-6xl"/>
                            <h1 className="text-white text-8xl border-b border=white">1000.00</h1>
                        </div>
                    </div>
                    <div className="grid grid-flow-col">
                        <div className="grid select-none items-center justify-items-center bg-white rounded-lg w-1/5 hover:scale-[.98]">
                            <h1 className="text-2xl text-black">Cash In</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Payments;