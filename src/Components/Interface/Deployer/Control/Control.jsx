import { GrDeploy } from 'react-icons/gr';
import Deploy from "./Deploy";
import { useEffect, useState } from 'react';
import { useUtil } from '../../../../Contexts/Util';
import { useData } from '../../../../Contexts/Data';

const Control = ({ deploy, website }) => {

    const { notify, confirm } = useUtil();
    const { deploys } = useData();
    const [websiteDeploys, setWebsiteDeploys] = useState([]);
    const [currentDeploy, setCurrentDeploy] = useState();

    useEffect(() => {
        if (!website || !deploys?.length) return;
        const websiteDeploys = deploys.filter(deploy => deploy.website === website?.name) || [];
        setWebsiteDeploys(websiteDeploys);
        setCurrentDeploy(websiteDeploys.find(({ id }) => id === website?.deploy));
    }, [deploys, website]);

    const revert = async (id) => {
        if (!id) return notify('No deploy specified.');
        if (!(await confirm(`You're about to revert back to ${id}. Make sure you still have the same files in Objects. Proceed?`))) return;
        deploy([], id);
    };

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] border border-black text-gunmetal rounded-lg p-3 overflow-auto">
            <div className="flex items-center gap-2 p-2">
                <GrDeploy size="40px" />
                <h1 className="text-5xl md:text-6xl font-bold">Your Deploys</h1>
            </div>
            <div className="grid gap-2 auto-rows-min overflow-auto">
                {
                    currentDeploy ? 
                    <Deploy i={0} deploy={currentDeploy} revert={revert} website={website} />
                    : 
                    <div className="flex place-content-center bg-black p-2 rounded-lg text-white">
                        <h1 className="text-3xl text-center">No deploy attached.</h1>
                    </div>
                }
                {
                    websiteDeploys?.filter(( { id }) => id !== website?.deploy)
                    .map((deploy, i) => (<Deploy i={i+1} key={`d${i}`} revert={revert} deploy={deploy} website={website} />))
                }
            </div>
        </div>
    )
};

export default Control;