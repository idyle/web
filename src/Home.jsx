import { useAuth, useUtil } from "./Context";
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile } from 'react-icons/ai';
import plans from './Payments/plans';
import UsageBar from 'react-usage-bar'
import "react-usage-bar/build/index.css";
import { MdOutlineDataUsage } from 'react-icons/md';

const Home = () => {

    const { user } = useAuth();

    const day = user?.planEnd && new Date(user?.planEnd * 1000).toLocaleString('default', { month: 'long' });
    const date = user?.planEnd && new Date(user?.planEnd * 1000).getDate();
    const plan = user?.planType && plans?.find(({ id }) => id === user?.planType)?.name;

    console.log(date, day, user?.planType, plan);

    const itemsToDisplay = [
        {
          name: "UI",
          value: 10,
          color: "#ffffff",
        },
        {
          name: "Photos",
          value: 30,
        },
        {
          name: "System Data",
          value: 33,
        },
        {
          name: "Other",
          value: 8,
        }]

    return (

        <div className="grid grid-cols-9 grid-rows-9 gap-2 m-6">
            <div className="col-span-2 row-span-6 bg-black text-white rounded-lg">EDITOR</div>
            {/* ALL EDITOR LIST */}
            <div className="flex items-center col-span-4 row-span-1 bg-black text-white rounded-lg px-3 gap-1">
                {user?.photoURL ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} /> : <BsPersonCircle size="60px" />}
                {user?.displayName && <h1 className="text-4xl text-white">{user?.displayName}</h1> }
            </div>
            <div className="col-span-3 row-span-3 bg-black text-white rounded-lg">DOCS</div>
            {/* ALL DOCS */}
            <div className="grid items-center col-span-4 row-span-2 bg-black text-white rounded-lg px-2">
                <div className="grid items-center justify-items-center auto-rows-min">
                    <div className="flex items-center gap-2">
                        { plan ? <AiOutlineCheck size="30px" /> : <AiOutlineClose size="30px" /> }
                        { plan ? <h1 className="text-4xl">Currently Selected: {plan} Plan</h1>  : <h1 className="text-4xl">No Plan Selected</h1> }
                    </div> 
                    { (date && day) && <h1 className="text-4xl">Renews {date} {day}</h1> }
                </div>
            </div>
            <div className="col-span-5 row-span-3 grid items-center justify-items-center">
                <div className="grid items-center justify-items-center auto-rows-min gap-2">
                    <div className="grid items-center justify-items-center border-b-2 border-black">
                        <div className="flex items-center justify-center px-10">
                            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-black pr-5 text-8xl font-bold">Welcome to idyle</h1>
                        </div>
                    </div>
                    <h1 className="animate-fadeinlong text-5xl">An open-platform website builder.</h1>
                    <div className="flex items-center border border-black rounded-lg p-2 hover:bg-black hover:text-white select-none">
                        <h1 className="text-3xl">Let's Get Started</h1>
                    </div>
                </div>
            </div>
            <div className="grid col-span-2 row-span-6 bg-black text-white rounded-lg p-4">
                <div className="grid items-center justify-items-center auto-rows-min">
                    <h1 className="text-4xl font-bold">Website</h1>
                    <h1 className="text-3xl">idylefinaltest.idyle.app</h1>
                </div>
            </div>
            {/* DEPLOYER: LATEST CONFIG + LATEST DEPLOY */}
            <div className="grid items-center justify-items-center col-span-4 row-span-3 bg-black text-white rounded-lg">
                <div className="grid items-center justify-items-center p-2 gap-2">
                    <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                        <div className="h-1 bg-white w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdOutlineDataUsage size="50px" />
                        <h1 className="text-6xl">12 of 100 GB Used</h1>
                    </div>
                    <UsageBar items={itemsToDisplay} total={100} compactLayout={true} darkMode={true} showPercentage={true} />
                </div>
            </div>
            <div className="grid justify-items-center items-center col-span-3 row-span-3 bg-black text-white rounded-lg">
                <div className="grid justify-items-center items-center gap-1">
                    <AiOutlineFile size="40px" />
                    <h1 className="text-4xl font-bold">Test.png</h1>
                    <h1 className="text-3xl">image/png</h1>
                    <div className="flex rounded-lg border border-white p-1 select-none hover:scale-[.98]">
                        <h1 className="text-3xl">Copy Link</h1>
                    </div>
                </div>
            </div>
        </div>
        
        // <div className="grid items-center justify-items-center auto-rows-min my-60">




        // </div>

    )

};

export default Home;