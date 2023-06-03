import { GrDeploy } from 'react-icons/gr';
import Deploy from "./Deploy";
import { useEffect } from 'react';
import { useUtil } from '../../../../Contexts/Util';
import { useAuth } from '../../../../Contexts/Auth';
import { listDeploys } from '../requests';
import { useState } from 'react';
import { useData } from '../../../../Contexts/Data';

const Control = ({ deploy }) => {

    const { user } = useAuth();
    const { setLoader, notify, prompt } = useUtil();
    const { deploys, resetDeploys, website } = useData();
    // const [deploys, setDeploys] = useState([]);
 
    // useEffect(() => {
    //     (async () => {
    //         if (!user) return;
    //         setLoader(true);
    //         const deploys = await listDeploys(user?.accessToken);
    //         console.log('LIST', deploys);
    //         setLoader(false);
    //         if (!deploys) return notify('Something went wrong.');
    //         setDeploys(deploys);
    //     })();
    // }, [user]);

    // needs deploy utility as well 

    useEffect(() => {
        if (!website) return;
        resetDeploys();
    }, [website])

    const revert = async (id) => {
        if (!id) return notify('No deploy specified.');
        if (!(await prompt(`You're about to revert back to ${id}. Make sure you still have the same files in Objects. Proceed?`))) return;
        deploy([], id);
    };

    const currentDeploy = deploys.find(d => d?.id === website?.deploy);
    console.log(currentDeploy, 'deploy', website, 'website', deploys);

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] border border-black rounded-lg p-3 overflow-auto">

            <div className="flex items-center gap-2 p-2">
                <GrDeploy size="40px" />
                <h1 className="text-5xl md:text-6xl">Your Deploys</h1>
            </div>

            <div className="grid gap-2 auto-rows-min overflow-auto">
                {
                currentDeploy ? <Deploy i={0} deploy={currentDeploy} revert={revert} website={website} />
                : <div className="flex place-content-center bg-black p-2 rounded-lg text-white">
                    <h1 className="text-3xl text-center">No deploy attached.</h1>
                </div>
                }
                
                {
                deploys?.filter(( { id }) => id !== website?.deploy)
                .map((deploy, i) => (<Deploy i={i+1} key={`d${i}`} revert={revert} deploy={deploy} website={website} />))
                }
            </div>

        </div>
    )
};

export default Control;