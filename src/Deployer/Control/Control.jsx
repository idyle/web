import { GrDeploy } from 'react-icons/gr';
import Deploy from "./Deploy";
import { useEffect } from 'react';
import { useAuth, useUtil } from '../../Contexts/Contexts';
import { listDeploys } from '../requests';
import { useState } from 'react';

const Control = ({ website, deploy }) => {

    const { user } = useAuth();
    const { setLoader, notify, prompt } = useUtil();

    const [deploys, setDeploys] = useState([]);
 
    useEffect(() => {
        (async () => {
            if (!user) return;
            setLoader(true);
            const deploys = await listDeploys(user?.accessToken);
            console.log('LIST', deploys);
            setLoader(false);
            if (!deploys) return notify('Something went wrong.');
            setDeploys(deploys);
        })();
    }, [user]);

    // needs deploy utility as well 

    const revert = async (id) => {
        if (!id) return notify('No deploy specified.');
        if (!(await prompt(`You're about to revert back to ${id}. Make sure you still have the same files in Objects. Proceed?`))) return;
        deploy([], id);
    };

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] border border-black rounded-lg p-3 overflow-auto">

            <div className="flex items-center gap-2 p-2">
                <GrDeploy size="40px" />
                <h1 className="text-6xl">Your Deploys</h1>
            </div>

            <div className="grid gap-2 auto-rows-min overflow-auto">
                {deploys?.map((deploy, i) => (<Deploy i={i} key={`d${i}`} revert={revert} deploy={deploy} website={website} />))}
            </div>

        </div>
    )
};

export default Control;