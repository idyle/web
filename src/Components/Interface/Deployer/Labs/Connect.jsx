import { useState } from "react";
import { useData } from "../../../../Contexts/Data";
import { MdLock } from "react-icons/md";
import { useUtil } from "../../../../Contexts/Util";
import { connectDomain, disconnectDomain } from "../requests";
import { useAuth } from "../../../../Contexts/Auth";

const Connect = ({ website }) => {
    const { user, getToken } = useAuth();
    const { resetWebsites } = useData();
    const { notify, confirm, load, inform } = useUtil();
    const [sub, setSub] = useState('');
    const [domain, setDomain] = useState('');
    const [tld, setTld] = useState('');

    const connect = async () => {
        if (!website) return notify('No website available. Please create or select one.');
        if (!domain || !tld) return notify('No domain or tld (.com) specified.');
        let host = `${domain}.${tld}`;
        if (sub) host = `${sub}.${host}`;
        load(true);
        const token = await getToken();
        const operation = await connectDomain(token, website?.name, host);
        load(false);
        if (!operation) return notify('Something went wrong...');
        inform(
            `Success! Please CNAME to ${website?.name}.idyle.app using the domain ${host}.`,
            'It may take up to 24 hours to propagate changes. Please ensure that there are no overlapping records on the domain. If you encounter any issues, contact us immediately.'
        )
        resetWebsites();
    };

    const disconnect = async () => {
        if (!(await confirm('Are you sure you want to disconnect your domain?'))) return;
        if (!website?.domain) return notify('No domain available.');
        load(true);
        const token = await getToken();
        const operation = await disconnectDomain(token, website?.name);
        load(false);
        if (!operation) return notify('Something went wrong...');
        resetWebsites();
        // reset to trigger a reload/resave
    };

    const validateLetters = (v) => /^[a-zA-Z]+$/.test(v);

    const onSubChange = (e) => {
        if (!validateLetters(e.target.value) && e.target.value) return;
        setSub(e.target.value);
    };
    const onDomainChange = (e) => {
        if (!validateLetters(e.target.value) && e.target.value) return;
        setDomain(e.target.value);
    };
    const onTldChange = (e) => {
        if (!validateLetters(e.target.value) && e.target.value) return;
        setTld(e.target.value)
    };

    return (
        <div className="grid auto-rows-min rounded-lg p-2 gap-2">
            <h1 className="text-5xl text-center">Connect a Custom Domain</h1>
            { !website?.domain ? <div className="grid md:grid-cols-3 gap-1 border border-black rounded-lg">
                <div className="grid bg-white">
                    <h1 className="text-4xl text-center">Subdomain</h1>
                    <input value={sub} onChange={onSubChange} type="text" className="bg-white text-center text-3xl border-b-2 border-black w-full" placeholder="www" />
                </div>

                <div className="grid bg-white">
                    <h1 className="text-4xl text-center">Domain</h1>
                    <input value={domain} onChange={onDomainChange} type="text" className="bg-white text-center text-3xl border-b-2 border-black w-full" placeholder="domain" />
                </div>

                <div className="grid bg-white">
                    <h1 className="text-4xl text-center">Top Level</h1>
                    <input value={tld} onChange={onTldChange} type="text" className="bg-white text-center text-3xl border-b-2 border-black w-full" placeholder="com" />
                </div>
            </div> : <div className="flex place-content-center items-center gap-1 bg-gray-200 rounded-lg p-1">
                <MdLock size="30px" />
                <h1 className="text-3xl md:text-5xl text-center">{website?.domain?.name}</h1>
            </div> }

            { !website?.domain ? <div onClick={connect} className="grid items-center justify-items-center bg-black text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-4xl font-bold">Connect Domain</h1>
            </div> : <div onClick={disconnect} className="grid items-center justify-items-center bg-black text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-4xl font-bold">Disconnect Domain</h1>
            </div> }
        </div>
    )
};

export default Connect;