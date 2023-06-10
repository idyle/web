import { Helmet } from "react-helmet";
import Labs from "./Labs/Labs";
import { useUtil } from "../../../Contexts/Util";
import { useAuth } from "../../../Contexts/Auth";
import { deployWebsite } from "./requests";
import { useData } from "../../../Contexts/Data";
import Subnav from "../Templates/Subnav";
import Subnavbutton from "../Templates/Subnavbutton";
import Station from "./Station";
import { Navigate, Route, Routes } from "react-router-dom";
import { IoMdFlask } from 'react-icons/io';
import { RiGasStationFill } from "react-icons/ri";

const Deployer = () => {

    const { user } = useAuth();
    const { load, notify } = useUtil();
    const { website, resetWebsite } = useData();

    const deploy = async (files = [], revert) => {
        load(true);
        const operation = await deployWebsite(user?.accessToken, website?.name, files, revert);
        load(false);
        if (!operation) return notify('Deploy failed :(');
        notify("Successfully deployed your page. Due to caching, changes may take up to an hour to take effect.");
        resetWebsite();
    };

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] md:grid-rows-1 md:grid-cols-[15%_85%] p-3 gap-1 ">
            <Helmet>
                <title>idyle - Deployer</title>
                <meta name="description" content="Deployer" />
                <meta name="keywords" content="Deployer" />
                <link rel="canonical" href="/deployer" />
            </Helmet>

            <Subnav type="side" mode="white">
                <Subnavbutton icon={<RiGasStationFill />} text="Station" route="/deployer/station" />
                <Subnavbutton icon={<IoMdFlask />} text="Labs" route="/deployer/labs" />
            </Subnav>

            <Routes>
                <Route path="station" element={<Station deploy={deploy} />} />
                <Route path="labs" element={<Labs />} />
                <Route path="*" element={<Navigate to="station" />} /> 
            </Routes>
        </div>
    )
};

export default Deployer;