import { GrDeploy } from 'react-icons/gr';
import Deploy from "./Deploy";
import { useEffect } from 'react';
import { useAuth, useUtil } from '../../Context';
import { listDeploys } from '../requests';
import { useState } from 'react';

const Control = () => {

    const { user } = useAuth();
    const { setLoader, notify } = useUtil();

    const [list, setList] = useState([]);
 
    useEffect(() => {
        (async () => {
            // if (!user) return;
            // setLoader(true);
            // const list = await listDeploys(user?.accessToken);
            // setLoader(false);
            // if (!list) return notify('Something went wrong.');
            // setList(list?.list);
        })();
    }, [user]);

    // needs deploy utility as well 

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] border border-black rounded-lg p-3 overflow-auto">

            <div className="flex items-center gap-2 p-2">
                <GrDeploy size="40px" />
                <h1 className="text-6xl">Your Deploys</h1>
            </div>

            <div className="grid gap-2 auto-rows-min overflow-auto">

                <Deploy />
                <Deploy />
                <Deploy />
                <Deploy />
                <Deploy />
            </div>

        </div>
    )
};

export default Control;