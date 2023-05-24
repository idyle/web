import { Helmet } from "react-helmet";
import Labs from "./Labs/Labs";
import { useUtil } from "../Contexts/Util";
import { useAuth } from "../Contexts/Auth";
import { deployWebsite } from "./requests";
import { useData } from "../Contexts/Data";
import Subnav from "../Templates/Subnav";
import Subnavbutton from "../Templates/Subnavbutton";
import { MdHome } from 'react-icons/md';
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { IoMdFlask } from 'react-icons/io';

const Deployer = () => {

    const { user } = useAuth();
    const { setLoader, notify } = useUtil();
    const { website, resetDeploys, resetWebsite } = useData();

    const deploy = async (files = [], revert) => {
        setLoader(true);
        const operation = await deployWebsite(user?.accessToken, website?.name, files, revert);
        setLoader(false);
        if (!operation) return notify('Deploy failed :(');
        console.log('deploy operation', operation);
        notify("Successfully deployed your page. Due to caching, changes may take up to an hour to take effect.");
        resetWebsite();
    };

    return (
        <div className="grid grid-cols-[15%_85%] m-3 gap-1 ">

            <Helmet>
                <title>idyle - Deployer</title>
                <meta name="description" content="Deployer" />
                <meta name="keywords" content="Deployer" />
                <link rel="canonical" href="/deployer" />
            </Helmet>

            <Subnav type="side" mode="white">
                <Subnavbutton icon={<MdHome />} text="Home" route="/deployer/home" />
                <Subnavbutton icon={<IoMdFlask />} text="Labs" route="/deployer/labs" />
            </Subnav>

            <Routes>
                <Route path="home" element={<Home deploy={deploy} />} />
                <Route path="labs" element={<Labs />} />
                <Route path="*" element={<Navigate to="home" />} /> 
            </Routes>

            {/* control, staging */}
            {/* labs,  */}

            {/* // <div className="grid grid-cols-2 gap-3 overflow-auto">
            //     <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1 overflow-auto">
            //         <Setup website={website} setWebsite={setWebsite} />
            //         <Control website={website} deploy={deploy} />
            //     </div>    
            //     <div className="grid gap-3 grid-rows-[4fr_2fr] overflow-auto">
            //         <Staging website={website} deploy={deploy} />
            //         <Labs />
            //     </div>
            // </div> */}

        </div>
    )
};

export default Deployer;