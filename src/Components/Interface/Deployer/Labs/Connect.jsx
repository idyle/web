import { useState } from "react";
import { useData } from "../../../../Contexts/Data";
import { MdLock } from "react-icons/md";
import { useUtil } from "../../../../Contexts/Util";
import { connectDomain, disconnectDomain } from "../requests";
import { useAuth } from "../../../../Contexts/Auth";

const Connect = () => {
    const { user } = useAuth();
    const { website, resetWebsite } = useData();
    const { notify, prompt, setLoader } = useUtil();
    const [sub, setSub] = useState('');
    const [domain, setDomain] = useState('');
    const [tld, setTld] = useState('');

    const connect = async () => {
        if (!domain || !tld) return notify('No domain or tld (.com) specified.');
        let host = `${domain}.${tld}`;
        if (sub) host = `${sub}.${host}`;
        setLoader(true);
        const operation = await connectDomain(user?.accessToken, host);
        setLoader(false);
        if (!operation) return notify('Something went wrong...');
        notify(`Success! Please CNAME to ${website?.name}.idyle.app to complete the connection.`, 10000)
        resetWebsite();
    };

    const disconnect = async () => {
        if (!(await prompt('Are you sure you want to disconnect your domain?'))) return;
        if (!website?.domain) return notify('No domain available.');
        setLoader(true);
        const operation = await disconnectDomain(user?.accessToken);
        setLoader(false);
        if (!operation) return notify('Something went wrong...');
        resetWebsite();
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
                <div className="grid">
                    <h1 className="text-4xl text-center">Subdomain</h1>
                    <input value={sub} onChange={onSubChange} type="text" className="text-center text-3xl border-b-2 border-black w-full" placeholder="www" />
                </div>

                <div className="grid">
                    <h1 className="text-4xl text-center">Domain</h1>
                    <input value={domain} onChange={onDomainChange} type="text" className="text-center text-3xl border-b-2 border-black w-full" placeholder="domain" />
                </div>

                <div className="grid">
                    <h1 className="text-4xl text-center">Top Level</h1>
                    <input value={tld} onChange={onTldChange} type="text" className="text-center text-3xl border-b-2 border-black w-full" placeholder="com" />
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