import { useState, useEffect } from "react";
import { useEditor } from "../Editor";
import { constructDom } from "./Converter";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dom = () => {

    const { page, css, font } = useEditor();
    const [dom, setDom] = useState([]);

    useEffect(() => {
        AOS.init();
    }, []);
    const onScroll = () => AOS.refresh();

    useEffect(() => {
        if (!page?.id || !page?.data) return;
        setDom(constructDom(page?.data, css, font));
    }, [page?.id, page?.data, css, font]);

    return (
        <div className="flex p-1 shadow-xl overflow-auto rounded-lg resize-none max-w-full place-content-center w-full">
            <div onScroll={onScroll} className={`@container w-full flex border-2 md:min-w-[240px] md:max-w-full border-gunmetal rounded-lg p-1 overflow-auto md:resize-x`}>
                {dom}
            </div>
        </div>
    )
};

export default Dom;