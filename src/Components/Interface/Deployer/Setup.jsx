import { MdCheck, MdInfoOutline } from "react-icons/md";
import { useUtil } from "../../../Contexts/Util";
import { useAuth } from "../../../Contexts/Auth";
import { useState } from "react";
import { setupWebsite } from "./requests";
import { BiLinkExternal } from 'react-icons/bi';
import { useData } from "../../../Contexts/Data";

const Setup = () => {

    console.log('from SETUP');

    const { user } = useAuth();
    const { resetWebsite, website } = useData();
    const { notify, load, confirm } = useUtil();

    const [clicked, setClicked] = useState(false);
    const [inputWebsite, setInputWebsite] = useState('');
    
    const onClick = async () => {
        if (!inputWebsite) return notify('No website name inputted.');
        if (!(await confirm('You are about to create a website. This action is permanent. Proceed?'))) return;
        load(true);
        const operation = await setupWebsite(user?.accessToken, inputWebsite);
        load(false);
        if (!operation) return notify("An error occured trying to make the website.");
        resetWebsite();
    };

    const onChange = (e) => setInputWebsite(e.target.value);

    const goToWebsite = () => {
        if (website?.name) window.open(`https://${website?.name}.idyle.app`, '_blank');
    };

    return (
        <div className="grid auto-rows-min overflow-auto bg-black rounded-lg text-white p-3">
            <div className="flex items-center justify-between gap-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h1 className="text-center text-2xl md:text-3xl font-bold">Website</h1>
                    {
                        website ? <h1 className="text-3xl text-center">{website?.name}</h1> :
                        <input onChange={onChange} className="text-white bg-black text-3xl w-full border-b-2" value={inputWebsite}/>
                    }
                </div>
                { website ? <BiLinkExternal onClick={goToWebsite} size="30px" /> : <MdCheck onClick={onClick} size="30px" /> }
            </div>

            { !website && <div className="flex items-center gap-1">
                <MdInfoOutline size="20px" />
                <div className="text-xl">This is a one-time only setup. Once saved, a website name cannot be changed.</div>
            </div> }
        </div>
    )
};

export default Setup;