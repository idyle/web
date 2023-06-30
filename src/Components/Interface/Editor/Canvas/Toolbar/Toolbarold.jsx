import { useEditor } from "../../Editor";
import { useDom } from "../Canvas";
import elements from './elements';
import { useEffect } from "react";
import { MdPages } from "react-icons/md";
import { RxText, RxSection, RxImage, RxVideo, RxLayout, RxViewVertical, RxListBullet, RxLetterCaseCapitalize, RxButton, RxLink2 } from 'react-icons/rx';
import { AiFillDelete, AiOutlineReload, AiFillEdit } from 'react-icons/ai';
import Element from './Element';
import { useUtil } from "../../../../../Contexts/Util";
import { useLocation, useNavigate } from "react-router-dom";

const Toolbar = () => {

    const { page, setPageData, pages } = useEditor();
    const { integrator, confirm, setIntegrator, notify, prompt } = useUtil();
    const { selectedData, updateFromPath, setObjectFromPath, deleteObjectFromPath, updateObjectFromPathCustom, path } = useDom();
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();

    // entering
    const sendObjectsRequest = () => {
        setIntegrator({ active: true, target: 'objects', origin: `${origin}?mode=canvas`, ref: { path, data: page?.data } });
        notify('Sending you to objects. Please select a file to add.');
        navigate('/objects');
    };

    // returning
    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'objects' || integrator?.origin !== `${origin}?mode=canvas`) return;
        const file = integrator?.data;
        const pageRef = integrator?.ref;
        if (file?.type.startsWith('image'))  setPageData({ ...setObjectFromPath(pageRef?.data, pageRef?.path, { ...elements['img'], src: file?.url }) });
        else if (file?.type.startsWith('video'))  setPageData({ ...setObjectFromPath(pageRef?.data, pageRef?.path, { ...elements['video'], src: file?.url }) });
        setIntegrator({ active: false });
    }, [integrator?.active]);

    const deleteElement = () => setPageData({ ...deleteObjectFromPath(page?.data, path) });
    const appendElement = (element) => setPageData({ ...setObjectFromPath(page?.data, path, { ...elements[element] }) });

    const clear = async () => {
        if (!(await confirm("You're about to clear all styles. Are you sure?"))) return;
        const clearFunc = (current) => {
            // brand new way of updating with arbitrary function
            current.style = {};
            current.className = '';
            return current;
        };
        setPageData({ ...updateFromPath(page?.data, path, clearFunc) });
    };

    const editProps = async () => {
        if (!path?.length) return;
        // if we don't have a selected item
        let config = { key: 'className', value: selectedData?.className || '' };
        // our default editable config
        if (selectedData?.component === 'img' || selectedData?.component === 'video') config = { key: 'alt', value: selectedData?.alt || '' };
        else if (selectedData?.component === 'a') config = { key: 'href', value: selectedData?.href || '' };

        const input = await prompt(config?.value);
        if (!input) return;
        let obj = {};
        obj[config?.key] = input;
        setPageData({ ...updateObjectFromPathCustom(page?.data, path, config?.key, input) });
    };
    
    const navigation = () => {
        let part = elements['navPart'];
        let arr = [];
        // dupl the part
        for (const { route: href, name: children } of pages) arr.push({ ...part, href, children });
        let base = elements['navBase'];
        // dupl the base
        setPageData({ ...setObjectFromPath(page?.data, path, { ...base, children: arr }, true)});
    };

    // entering
    const sendPagesRequest = () => {
        setIntegrator({ active: true, target: 'editor/pages', origin: `${origin}?mode=canvas`, ref: { path, data: page?.data } });
        notify('Sending you to pages. Please select a pages to add.');
        navigate('/editor/pages');
    };

    // returning
    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'editor/pages' || integrator?.origin !== `${origin}?mode=canvas`) return;
        const page = integrator?.data;
        const pageRef = integrator?.ref;
        setPageData({ ...setObjectFromPath(pageRef.data, pageRef.path, { ...elements['navPart'], href: page?.route, children: page?.name  }) });
        setIntegrator({ active: false });
    }, [integrator?.active]);

    return (
        <div className="grid md:grid-rows-[minmax(0,_1fr)_auto] gap-1 p-1">
            <div className="grid grid-rows-[auto_minmax(0,_1fr)] p-1 shadow-xl bg-gunmetal text-white rounded-lg gap-1">
                <h1 className="text-3xl font-bold text-center hidden md:block">Elements</h1>
                <div className="grid grid-flow-col md:grid-flow-row gap-1 p-1 overflow-auto">

                    <Element title="Header" onClick={() => appendElement('header')} icon={ <RxLetterCaseCapitalize />} />
                    <Element title="Text" onClick={() => appendElement('text')} icon={ <RxText />} />

                    <Element title="1 Section" onClick={() => appendElement('section1')} icon={ <RxSection />} />
                    <Element title="2 Section" onClick={() => appendElement('section2')} icon={ <RxViewVertical />} />
                    <Element title="3 Section" onClick={() => appendElement('section3')} icon={ <RxLayout />} />

                    <Element title="Image" onClick={sendObjectsRequest} icon={ <RxImage />} />
                    <Element title="Video" onClick={sendObjectsRequest} icon={ <RxVideo />} />

                    <Element title="Navigation" onClick={navigation} icon={ <RxListBullet />} />
                    <Element title="Page" onClick={sendPagesRequest} icon={ <MdPages />} />

                    <Element title="Button" onClick={() => appendElement('button')} icon={ <RxButton />} />
                    <Element title="Link" onClick={() => appendElement('link')} icon={ <RxLink2 />} />
                </div> 
            </div>

            <div className="grid bg-gunmetal text-white p-1 gap-1 rounded-lg overflow-auto">
                <h1 className="hidden md:block text-2xl text-center">Type: {selectedData?.component || 'Main'}</h1>
                <div className="grid grid-flow-col md:grid-flow-row p-1 gap-1">
                    <div onClick={clear} className="flex place-content-center items-center gap-1 p-1 bg-white rounded-lg text-gunmetal hover:scale-[.98] select-none">
                        <AiOutlineReload size="25px" />
                        <h1 className="hidden md:block text-xl text-center">Reset Styles</h1>
                    </div>
                    <div onClick={deleteElement} className="flex place-content-center items-center gap-1 p-1 bg-white rounded-lg text-gunmetal hover:scale-[.98] select-none">
                        <AiFillDelete size="25px" />
                        <h1 className="hidden md:block text-xl text-center">Delete Element</h1>
                    </div>
                    <div onClick={editProps} className="flex place-content-center items-center gap-1 p-1 bg-white rounded-lg text-gunmetal hover:scale-[.98] select-none">
                        <AiFillEdit size="25px" />
                        <h1 className="hidden md:block text-xl text-center">Edit Property</h1>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Toolbar;