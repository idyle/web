import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUtil } from "../../../../Contexts/Util";
import { useAuth } from "../../../../Contexts/Auth";
import { BsThreeDots } from 'react-icons/bs';
import { MdClose } from "react-icons/md";
import { convertPage } from "../../Editor/requests";
import { useData } from "../../../../Contexts/Data";

const Convert = () => {

    const navigate = useNavigate();
    const { pathname: origin } = useLocation();
    const { setIntegrator, notify, confirm, integrator, spin } = useUtil();
    const { getToken } = useAuth();
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
        spin(true);
        const token = await getToken();
        const operation = await convertPage(token, doc?.id, true);
        spin(false);
        if (!operation) return notify('Something went wrong converting the doc.');
        notify('Successfully converted the doc. Sending you to objects.');
        resetObjects();
        navigate('/objects');
    };

    return (
        <div className="grid auto-rows-min items-center p-3 md:p-10 gap-4">
            <h1 className="text-4xl md:text-5xl text-center font-bold">Custom Data</h1>
            <div onClick={sendPageRequest} className="flex p-0.5 flex-wrap items-center gap-2 place-content-center border-2 border-inherit rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-3xl md:text-4xl text-center">Select from Docs</h1>
            </div>

            <div className="flex items-center justify-between border-b-2 border-inherit">
                <div className="flex items-center p-1 gap-1">
                    <BsThreeDots size="25px" />
                    { doc?.id && <h1 className="text-2xl md:text-3xl">{doc?.id}.json</h1> }
                </div>
                { doc?.id && <MdClose onClick={remove} size="25px" /> }
            </div> 

            <div onClick={onConvert} className="grid items-center justify-items-center bg-gunmetal text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-3xl md:text-4xl text-center">Convert Data</h1>
            </div>
        </div>
    )
};

export default Convert;