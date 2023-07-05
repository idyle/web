import { useUtil } from "../../../Contexts/Util";
import { useAuth } from "../../../Contexts/Auth";
import { useState } from "react";
import { createWebsite } from "./requests";
import { BiLinkExternal, BiChevronDown, BiPlus, BiRightArrowAlt } from 'react-icons/bi';
import { useData } from "../../../Contexts/Data";

const Setup = ({ website }) => {

    const { getToken } = useAuth();
    const { resetWebsites, websites, setWebsiteName } = useData();
    const { load, notify, prompt } = useUtil();
    const [active, setActive] = useState(false);
    
    const onCreate = async () => {
        if (active) setActive(false);
        const websiteName = await prompt('', 'Input the name of your website below');
        if (!websiteName) return;
        notify("Started setting up your website. We'll let you know when it's complete!");
        load(true);
        const token = await getToken();
        const operation = await createWebsite(token, websiteName);
        load(false);
        if (!operation) return notify("An error occured trying to make the website.");
        notify("Successfully created the website.");
        resetWebsites();
    };

    const onVisit = () => {
        if (website?.name) window.open(`https://${website?.name}.idyle.app`, '_blank');
    };

    return (
        <div className="block relative">
            <div className="grid auto-rows-min bg-blue text-black rounded-lg p-3">
                { websites?.length ? <div className="flex items-center justify-between gap-1">
                    <div onClick={onVisit} className="flex items-center gap-2 hover:bg-black/10 rounded-lg select-none">
                        <BiLinkExternal size="30px" /> 
                        <h1 className="text-center text-3xl font-bold">Website</h1>
                        <h1 className="text-3xl text-center">{website?.name}</h1>
                    </div> 
                    <div onClick={() => setActive(!active)} className="flex rounded-xl hover:bg-black/10">
                        <BiChevronDown size="40px" />
                    </div>
                </div> : 
                <div onClick={onCreate} className="flex items-center p-1 gap-1 hover:bg-black/10 rounded-lg select-none">
                    <BiPlus size="30px" />
                    <h1 className="text-3xl font-bold">Create a Website</h1>
                </div> }
            </div> 

            { active && <div onBlur={() => setActive(false)} className="absolute w-full z-10 bg-black text-blue rounded-lg">
                {
                    websites.map(({ website }, i) => (
                        <div onClick={() =>{
                            setWebsiteName(website?.name);
                            setActive(false);
                        }} key={`w${i}`} className="flex items-center justify-between p-3 gap-1 hover:bg-white/10 select-none">
                            <div className="flex gap-2">
                                <h1 className="text-3xl font-bold">Website</h1>
                                <h1 className="text-3xl">{website?.name}</h1>
                            </div>
                            <BiRightArrowAlt size="30px" />
                        </div> 
                    ))
                }
                <div onClick={onCreate} className="flex items-center p-3 gap-1 hover:bg-white/10 select-none">
                    <BiPlus size="30px" />
                    <h1 className="text-3xl font-bold">Create a Website</h1>
                </div>
            </div> }
        </div>

    )
};

export default Setup;