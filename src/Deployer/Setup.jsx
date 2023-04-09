import { MdCheck, MdInfoOutline, MdRadioButtonChecked } from "react-icons/md";
import { useAuth, useUtil } from "../Context";
import { useState } from "react";
import { getWebsite, setupWebsite } from "./requests";
import { useEffect } from "react";

const Setup = () => {


    const { user } = useAuth();
    const { notify, setLoader } = useUtil();

    const [clicked, setClicked] = useState(false);
    const [website, setWebsite] = useState('');
    const [inputWebsite, setInputWebsite] = useState('');
    
    const onClick = async () => {
        if (clicked || !inputWebsite) return notify('An error occured.');
        if (!inputWebsite) return notify('No website name inputted.');
        setClicked(true);
        setLoader(true);
        console.log('req', user?.accessToken, inputWebsite);
        const operation = await setupWebsite(user?.accessToken, inputWebsite);
        console.log('res', operation);
        setLoader(false);
        if (operation) window.location.reload();
        // come up with a better state management checker in auth
    };

    const onChange = (e) => setInputWebsite(e.target.value);

    useEffect(() => {
        (async () => {
            if (!user) return;
            setLoader(true);
            const website = await getWebsite(user?.accessToken);
            setLoader(false);
            if (!website) return notify('You may currently not own a website.');
            setWebsite(website?.website);
        })();
    }, [user]);

    return (
        <div className="grid auto-rows-min bg-black rounded-lg text-white p-3">

            <div className="flex w-full items-center justify-between gap-2">
                <div className="flex w-full items-center gap-2">
                    <h1 className="shrink-0 text-4xl font-bold">Website Name</h1>
                    {
                        website ? <h1 className="text-3xl">{website}</h1> :
                        <input onChange={onChange} className="text-white bg-black text-3xl w-full border-b-2" value={inputWebsite}/>
                    }
                </div>
                { website ? <MdRadioButtonChecked size="30px" /> : <MdCheck onClick={onClick} size="30px" /> }
            </div>

            { !website && <div className="flex items-center gap-1">
                <MdInfoOutline size="20px" />
                <div className="text-xl">This is a one-time only setup. Once saved, a website name cannot be changed.</div>
            </div> }
       
        </div>
    )
};

export default Setup;