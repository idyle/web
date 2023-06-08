import { useState } from "react";
import { useData } from "../../../Contexts/Data";
import Control from "./Control/Control";
import Setup from "./Setup";
import Staging from "./Staging/Staging";

const Home = ({ deploy }) => {

    const { website, setWebsite} = useData();
    const [staging, setStaging] = useState(true);

    return (
        <div className="grid md:grid-cols-2 gap-3 md:overflow-auto">

                <div className={`${staging ? 'hidden' : 'grid'} md:grid grid-rows-[auto_auto_minmax(0,_1fr)] md:gap-1 md:overflow-auto`}>
                    <div onClick={() => setStaging(true)} className="flex md:hidden items-center place-content-center m-2 rounded-lg border border-black hover:bg-gray-300">
                        <h1 className="text-2xl">Back to Staging</h1>
                    </div>
                    <Setup website={website} setWebsite={setWebsite} />
                    <Control website={website} deploy={deploy} />
                </div> 
           

            <div className={`${!staging ? 'hidden' : 'grid'} md:grid grid-rows-[auto_minmax(0,_1fr)] md:grid-rows-1`}>
                <div onClick={() => setStaging(false)} className="flex md:hidden items-center place-content-center m-2 rounded-lg border border-black hover:bg-gray-300">
                    <h1 className="text-2xl">Go to Deploys</h1>
                </div>
                <Staging website={website} deploy={deploy} />
            </div>   
        </div>
    )
};

export default Home;