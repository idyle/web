import { useEffect, useState } from "react";
import { renderElements } from "./Converter";
import { useEditor } from "../Editor";
import { useDom } from "./Codebase";
import { useUtil } from "../../Contexts/Util";
import { useLocation, useNavigate } from "react-router-dom";
import { stringify } from "himalaya";

const Toolbar = () => {
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();
    const { page } = useEditor();
    const { toggle, setToggle, setDom, setString, string, convertJSONtoHimalayaJSON } = useDom();
    const { integrator, setIntegrator, notify } = useUtil();

    const toggleTailwind = () => {
        setToggle(!toggle);
        setDom(renderElements(page?.data, !toggle));
    };

    // entering
    const sendDocsRequest = () => {
        console.log(string, 'string');
        setIntegrator({ active: true, target: 'docs', origin, ref: string });
        notify('Sending you to docs. Please select a doc to add');
        navigate('/docs');
        // needs to handle on docs' side still
    };

    // returning
    useEffect(() => {

        const render = (str) => {
            setIntegrator({ active: false });
            if (page?.data) setDom(renderElements(page?.data, toggle));
            setString(str);
        };
        try {
            if (!integrator?.active || !integrator?.data) return;
            if (integrator?.target !== 'docs' || integrator?.origin !== origin) return; 
            const config = integrator?.data;
            // actual thing to convert
            console.log('data sent back', config);
            const himalayaJSON = convertJSONtoHimalayaJSON(config);
            console.log(himalayaJSON, 'HIMALAYA json');
            if (!himalayaJSON) return render(integrator?.ref);
            const stringified = stringify([himalayaJSON]);
            if (!stringified) return render(integrator?.ref);
            console.log(`${integrator?.ref}${stringified}`);
            render(`${integrator?.ref}${stringified}`);
        } catch {
            notify('Something went wrong.');
            render(integrator?.ref)
        }
    }, [integrator?.active])

    return (
        <div className="grid grid-flow-col border border-black rounded-lg p-1 gap-2">
            <div onClick={toggleTailwind} className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-2xl">Toggle Tailwind CSS ({toggle ? 'ON' : 'OFF'})</h1>
            </div>
            <div className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-2xl">Import Custom CSS File</h1>
            </div>
            <div onClick={sendDocsRequest} className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-2xl">Convert Docs to HTML</h1>
            </div>
        </div>
    );
}; 

export default Toolbar;