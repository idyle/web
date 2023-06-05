import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUtil } from "../../../../Contexts/Util";
import { useAuth } from "../../../../Contexts/Auth";
import { BsThreeDots } from 'react-icons/bs';
import { MdClose } from "react-icons/md";
import { convertPage } from "../requests";
import { useData } from "../../../../Contexts/Data";

const Convert = () => {

    const navigate = useNavigate();
    const { pathname: origin } = useLocation();
    const { setIntegrator, notify, confirm, integrator, load } = useUtil();
    const { user } = useAuth();
    const { resetObjects } = useData();
    const [doc, setDoc] = useState();

    // sendPageRequest
    const sendPageRequest = async () => {
        setIntegrator({ active: true, target: 'docs', origin });
        notify('Sending you to docs. Please select a page to convert.');
        navigate('/docs');
    };

    // returning
    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'docs' || integrator?.origin !== origin) return;
        console.log('received data', integrator?.data);
        setDoc(integrator?.data);
        setIntegrator({ active: false });
    }, [integrator?.active]);

    const remove = async () => {
        if (!(await confirm('Remove your chosen doc?'))) return;
        setDoc();
        notify('Removed the doc.');
    };

    const onConvert = async () => {
        if (!doc?.id) return;
        load(true);
        const operation = await convertPage(user?.accessToken, doc?.id, true);
        load(false);
        if (!operation) return notify('Something went wrong converting the doc.');
        notify('Successfully converted the doc. Sending you to objects.');
        resetObjects();
        navigate('/objects');
    };

    return (
        <div className="grid auto-rows-min p-3 gap-2 border-b-4 border-black">
            <h1 className="text-5xl text-center">Convert Custom Data</h1>
            <div onClick={sendPageRequest} className="flex p-0.5 flex-wrap items-center gap-2 place-content-center border border-black rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl text-center">Select Data from Docs</h1>
            </div>

            { doc?.id && <div className="flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center p-1 gap-1">
                    <BsThreeDots size="25px" />
                    <h1 className="text-3xl">{doc?.id}.json</h1>
                </div>
                <MdClose onClick={remove} size="25px" />
            </div> }

            <div onClick={onConvert} className="grid items-center justify-items-center bg-black text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-4xl font-bold">Convert Data</h1>
            </div>
        </div>
    )
};

export default Convert;