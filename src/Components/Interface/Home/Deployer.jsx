import { useData } from "../../../Contexts/Data";
import { BiLinkExternal } from 'react-icons/bi';

const Deployer = () => {

    const { deploys, websites } = useData();
    const website = websites[0]?.website;

    const deploy = deploys?.find(({ id }) => id === website?.deploy) || {};
    const i = deploys.findIndex(({ id }) => id === website?.deploy) || null;
    const date = new Date(deploy?.timestamp).toDateString();


    const goToWebsite = () => {
        if (website?.name) window.open(`https://${website?.name}.idyle.app`, '_blank');
    };

    return (
        <div className="grid items-center justify-items-center gap-2 p-3">

            <div className="grid w-full items-center justify-items-center rounded-lg p-1 gap-1">
                <h1 className="text-4xl lg:text-5xl text-center font-bold break-all">Website</h1>
                { website?.name ? <h1 className="text-4xl text-center break-all rounded-lg p-1">{website?.name}</h1> : <h1 className="text-3xl text-center">No website created.</h1> }
                { website?.name && <div onClick={goToWebsite} className="flex p-2 gap-1 items-center border border-gunmetal rounded-lg select-none hover:scale-[.98]">
                    <BiLinkExternal size="30px" />
                    <h1 className="text-3xl text-center break-all">Visit Website</h1>
                </div> }
            </div> 

            <div className="grid w-full items-center justify-items-center gap-1 rounded-lg p-1 ">
                <h1 className="text-4xl lg:text-5xl text-center font-bold">Deploys</h1>
                { deploy?.id ? <div className="grid items-center-justify-items-center gap-2">
                    <h1 className="text-3xl text-center break-all italic">{deploy?.id}</h1>
                    <h1 className="text-3xl text-center break-all">Updated {date}</h1>
                </div> : <h1 className="text-3xl text-center">No deploy created.</h1> }
            </div> 
        </div>
    )
};

export default Deployer;