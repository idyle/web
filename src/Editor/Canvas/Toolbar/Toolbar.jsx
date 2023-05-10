import { useEditor } from "../../Editor";
import { useDom } from "../Canvas";
import elements from './elements';
import { useEffect, useState } from "react";
import { RxText, RxSection, RxImage, RxVideo, RxLayout, RxViewVertical, RxListBullet, RxBarChart, RxLetterCaseCapitalize, RxButton, RxLink2 } from 'react-icons/rx';
import { AiFillDelete, AiOutlineReload } from 'react-icons/ai';
import Element from './Element';
import { useUtil } from "../../../Contexts/Util";
import { useLocation, useNavigate } from "react-router-dom";

const Elements = () => {

    const { page, setPageData } = useEditor();
    const { integrator, setIntegrator, notify } = useUtil();
    const { selected, updateObjectFromPath, setObjectFromPath, deleteObjectFromPath, path, setPath } = useDom();
    const [selType, setSelType] = useState('None');
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();

    useEffect(() => {
        if (!selected) return;
        let path = [];
        if (selected?.includes('-')) path = selected.split('-');
        path.shift();
        for (let i = 0; i < path.length; i++) path[i] = parseInt(path[i]);
        setPath(path);
    }, [selected]);

    useEffect(() => {
        if (!path.length) return setSelType('None');
        let current = page?.data;
        for (let depth = 0; depth < path.length; depth++) if (current.component === 'div') current = current.children[path[depth]];
        setSelType(current?.component);
    }, [path]);

    // entering
    const sendObjectsRequest = () => {
        setIntegrator({ active: true, target: 'objects', origin });
        notify('Sending you to objects. Please select a file to add.');
        navigate('/objects');
    };

    // returning
    useEffect(() => {
        console.log(integrator);
        if (!integrator?.active || !integrator?.data) return console.log('EHK');
        if (integrator?.target !== 'objects' || integrator?.origin !== origin) return console.log('ehk2');
        const file = integrator?.data;
        if (file?.type.startsWith('image')) setPageData({ ...setObjectFromPath(page.data, path, { ...elements['img'], src: file?.url }) });

        setIntegrator({ active: false });
    }, [integrator?.active]);

    const updateElement = (className, merge) => setPageData({ ...updateObjectFromPath(page?.data, path, className, merge) });
    const deleteElement = () => setPageData({ ...deleteObjectFromPath(page.data, path) });
    const appendElement = (element) => setPageData({ ...setObjectFromPath(page.data, path, { ...elements[element] }) });

    return (
        <div className="grid grid-rows-[80%_20%] gap-1 p-1">
            <div className="grid grid-rows-[auto_minmax(0,_1fr)] p-1 shadow-xl border border-black rounded-lg gap-1">
                <h1 className="text-3xl font-bold text-center">Elements</h1>
                <div className="grid auto-rows-min gap-1 p-1 overflow-auto">

                    <Element title="Header" onClick={() => appendElement('header')} icon={ <RxLetterCaseCapitalize />} />
                    <Element title="Text" onClick={() => appendElement('text')} icon={ <RxText />} />

                    <Element title="1 Section" onClick={() => appendElement('section1')} icon={ <RxSection />} />
                    <Element title="2 Section" onClick={() => appendElement('section2')} icon={ <RxViewVertical />} />
                    <Element title="3 Section" onClick={() => appendElement('section3')} icon={ <RxLayout />} />

                    <Element title="Image" onClick={sendObjectsRequest} icon={ <RxImage />} />
                    <Element title="Video" onClick={() => appendElement('img')} icon={ <RxVideo />} />

                    <Element title="Navigation" onClick={() => appendElement('img')} icon={ <RxListBullet />} />

                    <Element title="Button" onClick={() => appendElement('button')} icon={ <RxButton />} />
                    <Element title="Link" onClick={() => appendElement('link')} icon={ <RxLink2 />} />
                </div> 
            </div>

            <div className="grid border border-black p-1 gap-1 rounded-lg">
                <h1 className="text-2xl text-center">Selected: {selType}</h1>
                <div onClick={() => updateElement('', false)} className="flex place-content-center items-center gap-1 p-1 bg-black rounded-lg text-white hover:bg-gray-500 select-none">
                    <AiOutlineReload size="25px" />
                    <h1 className="text-xl">Reset Styles</h1>
                </div>
                <div onClick={deleteElement} className="flex place-content-center items-center gap-1 p-1 bg-black rounded-lg text-white hover:bg-gray-500 select-none">
                    <AiFillDelete size="25px" />
                    <h1 className="text-xl">Delete Element</h1>
                </div>
            </div>
        </div>
    )
};

export default Elements;