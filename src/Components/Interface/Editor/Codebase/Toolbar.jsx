import { useEffect, useState } from "react";
import { constructDom, renderElements } from "./Converter";
import { useEditor } from "../Editor";
import { useDom } from "./Codebase";
import { useUtil } from "../../../../Contexts/Util";
import { useLocation, useNavigate } from "react-router-dom";
import { stringify } from "himalaya";
import { SiTailwindcss, SiCss3 } from 'react-icons/si';
import { HiOutlineDatabase } from 'react-icons/hi';

const Toolbar = () => {
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();
    const { page, setPage, save } = useEditor();
    const { toggle, setToggle, setDom, setString, string, 
        convertJSONtoHimalayaJSON, css, setCss, font 
    } = useDom();
    const { integrator, setIntegrator, notify } = useUtil();

    const toggleTailwind = () => {
        setToggle(!toggle);
        setPage({ ...page, metadata: { ...page?.metadata, toggle: !toggle }});
        save({ ...page, metadata: { ...page?.metadata, toggle: !toggle }});
        // setDom(renderElements(page?.data, !toggle));
    };

    // entering
    const sendDocsRequest = () => {
        setIntegrator({ active: true, target: 'docs', origin: `${origin}?mode=codebase`, ref: string });
        notify('Sending you to docs. Please select a doc to add');
        navigate('/docs');
        // needs to handle on docs' side still
    };

    // returning
    useEffect(() => {

        const render = (str) => {
            setIntegrator({ active: false });
            if (page?.data) setDom(constructDom(page?.data, toggle, css, font, 'TOOLBAR'));
            setString(str);
        };
        try {
            if (!integrator?.active || !integrator?.data) return;
            if (integrator?.target !== 'docs' || integrator?.origin !== `${origin}?mode=codebase`) return; 
            const config = integrator?.data;
            // actual thing to convert
            const himalayaJSON = convertJSONtoHimalayaJSON(config);
            if (!himalayaJSON) return render(integrator?.ref);
            const stringified = stringify([himalayaJSON]);
            if (!stringified) return render(integrator?.ref);
            render(`${integrator?.ref}${stringified}`);
        } catch {
            notify('Something went wrong.');
            render(integrator?.ref)
        }
    }, [integrator?.active]);

    const sendObjectsRequest = () => {
        // send a file reques
        setIntegrator({ active: true, target: 'objects', origin: `${origin}?mode=codebase`, ref: page });
        notify('Sending you to objects. Please select a CSS file to import.');
        navigate('/objects');
    };

    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'objects' || integrator?.origin !== `${origin}?mode=codebase`) return;
        if (!integrator?.data?.type?.startsWith('text/css')) return notify('Invalid file');
        // we can only except of type text/css
        setCss(integrator?.data?.url);
        setPage({ ...integrator?.ref, metadata: { ...integrator?.ref?.metadata, css: integrator?.data?.url }});
        save({ ...integrator?.ref, metadata: { ...integrator?.ref?.metadata, css: integrator?.data?.url }});
        setIntegrator({ active: false });
        // now we have to handle the render on codebase & canvas 
        // we also need to transfer css & toggle to main context (done) 
    }, [integrator?.active]);

    const ejectCss = () => {
        setCss();
        setPage({ ...page, metadata: { ...page?.metadata, css: null }});
        save({ ...page, metadata: { ...page?.metadata, css: null }});
    };

    return (
        <div className="order-1 md:order-2 grid grid-flow-col border border-black rounded-lg p-1 gap-2">
            <div onClick={toggleTailwind} className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98] gap-1">
                <SiTailwindcss size="25px" />
                <h1 className="text-2xl text-center hidden md:block">Toggle Tailwind CSS ({toggle ? 'ON' : 'OFF'})</h1>
            </div>
            { !css ? <div onClick={sendObjectsRequest} className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98] gap-1">
                <SiCss3 size="25px" />
                <h1 className="text-2xl text-center hidden md:block">Custom CSS File (IMPORT)</h1>
            </div> : <div onClick={ejectCss} className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98] gap-1">
                <SiCss3 size="25px" />
                <h1 className="text-2xl text-center hidden md:block">Custom CSS File (EJECT)</h1>
            </div> }
            <div onClick={sendDocsRequest} className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98] gap-1">
                <HiOutlineDatabase size="25px" />
                <h1 className="text-2xl text-center hidden md:block">Convert Docs to HTML</h1>
            </div>
        </div>
    );
}; 

export default Toolbar;