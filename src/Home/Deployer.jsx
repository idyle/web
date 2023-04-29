import { useData } from "../Contexts/Data";

const Deployer = () => {

    const { deploys, website } = useData();
    const deploy = deploys?.find(({ id }) => id === website?.deploy) || {};
    const i = deploys.findIndex(({ id }) => id === website?.deploy) || null;
    const date = new Date(deploy?.timestamp).toDateString();

    return (
        <div className="grid items-center justify-items-center auto-rows-min gap-2 p-3">
            <h1 className="text-4xl font-bold">Deployer</h1>
            { website?.name ? <div className="grid w-full items-center justify-items-center rounded-lg p-1 border border-white">
                <h1 className="text-4xl">Website</h1>
                { website?.name && <h1 className="text-4xl text-center break-all border-b-2 border-white rounded-lg p-1">{website?.name}</h1> }
                <h1 className="text-3xl text-center italic">.idyle.app</h1>
            </div> : <h1 className="text-4xl text-center italic">No website created.</h1> }

            { deploy?.id ? <div className="grid w-full items-center justify-items-center gap-1 rounded-lg p-1 border border-white">
                <h1 className="text-4xl">Deploy</h1>
                <div className="grid items-center-justify-items-center">
                    <h1 className="text-4xl text-center">#{i}</h1>
                    <h1 className="text-3xl text-center break-all italic">{deploy?.id}</h1>
                    <h1 className="text-3xl text-center">Updated {date}</h1>
                </div>
            </div> : <h1 className="text-4xl text-center italic">No deploy created.</h1>}
        </div>
    )
};

export default Deployer;