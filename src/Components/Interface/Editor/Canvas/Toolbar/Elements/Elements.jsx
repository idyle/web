import elements from './elements.js';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditor } from "../../../Editor.jsx";
import { useUtil } from "../../../../../../Contexts/Util.jsx";
import { useDom } from "../../Canvas.jsx";
import Element from './Element.jsx';
import { RxText, RxSection, RxImage, RxVideo, RxLayout, RxViewVertical, RxListBullet, RxLetterCaseCapitalize, RxButton, RxLink2 } from 'react-icons/rx';
import { MdPages } from "react-icons/md";
import Aos from 'aos';

const Elements = () => {

    const { page, setPageData, pages } = useEditor();
    const { integrator, setIntegrator, notify } = useUtil();
    const { path, setObjectFromPath } = useDom();
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();

    const appendElement = (element) => {
        Aos.refreshHard();
        setPageData({ ...setObjectFromPath(page?.data, path, { ...elements[element] }) });
        console.log(element, elements[element])
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
        <div className="flex flex-wrap place-content-center md:place-content-start items-center p-1 shadow-xl bg-white text-gunmetal rounded-lg gap-1">
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
    )
};

export default Elements;