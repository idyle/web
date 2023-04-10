import { Helmet } from "react-helmet";
import Control from "./Control/Control";
import Setup from './Setup';
import Staging from "./Staging/Staging";
import Labs from "./Labs";
import { useState, useEffect } from "react";
import { useAuth, useUtil } from "../Context";
import { deployWebsite, getWebsite } from "./requests";

const Deployer = () => {

    const { user } = useAuth();
    const { setLoader, notify, prompt } = useUtil();
    const [website, setWebsite] = useState('');

    useEffect(() => {
        (async () => {
            if (!user) return;
            setLoader(true);
            const website = await getWebsite(user?.accessToken);
            setLoader(false);
            if (!website) return notify('You may currently not own a website.');
            setWebsite(website?.website);
        })();
    }, [user]);

    const deploy = async (files = [], revert) => {
        setLoader(true);
        const operation = await deployWebsite(user?.accessToken, website?.name, files, revert);
        setLoader(false);
        if (!operation) return notify('Deploy failed :(');
        console.log('deploy operation', operation);
    };

    return (
        <div className="grid m-5">

            <Helmet>
                <title>idyle - Deployer</title>
            </Helmet>

            <div className="grid grid-cols-2 gap-3 overflow-auto">
                <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1 overflow-auto">
                    <Setup website={website} setWebsite={setWebsite} />
                    <Control website={website} deploy={deploy} />
                </div>    
                <div className="grid gap-3 grid-rows-[4fr_2fr] overflow-auto">
                    <Staging website={website} deploy={deploy} />
                    <Labs />
                </div>
            </div>

        </div>
    )
};

export default Deployer;