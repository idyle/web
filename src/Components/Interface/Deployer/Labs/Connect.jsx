import { useEffect, useState } from "react";
import { useData } from "../../../../Contexts/Data";
import { MdLock, MdPending } from "react-icons/md";
import { useUtil } from "../../../../Contexts/Util";
import { connectDomain, disconnectDomain } from "../requests";
import { useAuth } from "../../../../Contexts/Auth";

const Connect = ({ website }) => {
    const { getToken } = useAuth();
    const { resetWebsites } = useData();
    const { notify, confirm, spin, inform, prompt } = useUtil();
    const [domain, setDomain] = useState(website?.domain?.name);

    const connect = async () => {
        if (!website) return notify('No website available. Please create or select one.');
        if (!domain) return notify('No domain specified.');
        spin(true);
        const token = await getToken();
        const operation = await connectDomain(token, website?.name, domain);
        spin(false);
        if (!operation) return notify('Something went wrong...');
        inform(
            `Success! Please CNAME to ${website?.name}.idyle.app using the domain ${domain}.`,
            'It may take up to 24 hours to propagate changes. Please ensure that there are no overlapping records on the domain. If you encounter any issues, contact us immediately.'
        )
        resetWebsites();
    };

    const disconnect = async () => {
        if (!(await confirm('Are you sure you want to disconnect your domain?'))) return;
        if (!website?.domain) return notify('No domain available.');
        spin(true);
        const token = await getToken();
        const operation = await disconnectDomain(token, website?.name);
        spin(false);
        if (!operation) return notify('Something went wrong...');
        resetWebsites();
        // reset to trigger a reload/resave
    };

    useEffect(() => {
        if (!website?.domain?.name || website?.domain?.name === domain) return;
        setDomain(website?.domain?.name);
        // updating the domain if the website is updated 
    }, [website?.domain?.name]);

    const onClick = async () => {
        const input = await prompt('', 'Input a domain name. Ex: www.idyle.app');
        if (!input) return;
        const domainRegex = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;
        if (!(domainRegex.test(input))) return notify('This is not a valid domain name.');
        if (input.split('.')?.length < 3) return notify('Please specify a valid subdomain.');
        setDomain(input);
    };

    return (
        <div className="grid auto-rows-min items-center p-2 md:p-10 gap-4">
            <h1 className="text-4xl md:text-5xl text-center font-bold">Custom Domains</h1>
            {  !domain ?
                <div onClick={onClick} className="flex p-0.5 flex-wrap items-center gap-2 place-content-center border-2 border-inherit rounded-xl select-none hover:scale-[.98]">
                    <h1 className="text-3xl md:text-4xl text-center">Add a Domain</h1>
                </div> : <div className="flex place-content-center items-center gap-1 bg-gunmetal/10 rounded-lg p-1">
                    { website?.domain ? <MdLock size="30px" /> : <MdPending onClick={onClick} size="30px" /> }
                    <h1 className="text-4xl md:text-5xl text-center">{domain}</h1>
                </div> }

            { !website?.domain ? <div onClick={connect} className="grid items-center justify-items-center bg-gunmetal text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-3xl md:text-4xl text-center">Connect Domain</h1>
            </div> : <div onClick={disconnect} className="grid items-center justify-items-center bg-gunmetal text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-3xl md:text-4xl text-center">Disconnect Domain</h1>
            </div> }
        </div>
    )
};

export default Connect;