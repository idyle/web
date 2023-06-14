import { useData } from "../../../Contexts/Data";

const Deployer = () => {

    const { deploys, website } = useData();
    const deploy = deploys?.find(({ id }) => id === website?.deploy) || {};
    const i = deploys.findIndex(({ id }) => id === website?.deploy) || null;
    const date = new Date(deploy?.timestamp).toDateString();

    const goToWebsite = () => {
        if (website?.name) window.open(`https://${website?.name}.idyle.app`, '_blank');
    };

    return (
        <div className="grid items-center justify-items-center auto-rows-min gap-2 p-3">

            { website?.name ? <div className="grid w-full items-center justify-items-center rounded-lg p-1 gap-1">
                <h1 className="text-4xl font-bold">Website</h1>
                { website?.name && <h1 className="text-4xl text-center break-all rounded-lg p-1">{website?.name}</h1> }
                <div onClick={goToWebsite} className="flex p-2 border border-white rounded-lg select-none hover:scale-[.98]">
                    <h1 className="text-3xl text-center">Visit Website</h1>
                </div>
            </div> : <h1 className="text-4xl text-center">No website created.</h1> }

            { deploy?.id ? <div className="grid w-full items-center justify-items-center gap-1 rounded-lg p-1 ">
                <h1 className="text-4xl text-center font-bold">Deploy #{i}</h1>
                <div className="grid items-center-justify-items-center gap-2">
                    <h1 className="text-3xl text-center break-all italic">{deploy?.id}</h1>
                    <h1 className="text-3xl text-center">Updated {date}</h1>
                </div>
            </div> : <h1 className="text-4xl text-center">No deploy created.</h1>}
        </div>
    )
};

export default Deployer;