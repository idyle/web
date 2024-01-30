import { useState, useEffect } from "react";
import { useEditor } from "../Editor";
import { constructDom } from "./Converter";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useData } from "../../../../Contexts/Data";

const Dom = () => {

    const { editor } = useData();
    const { page, css, font, editData } = useEditor();
    const [navbarDom, setNavbarDom] = useState([]);
    const [dom, setDom] = useState([]);

    useEffect(() => {
        AOS.init();
        window.addEventListener('load', AOS.refreshHard());
    }, []);
    
    const onScroll = () => {
        AOS.refreshHard();
    };

    useEffect(() => {
        if (!page?.id || !page?.data) return;
        console.log(page?.data, 'page data!');
        setDom(constructDom(page?.data, css, font));
    }, [page?.id, page?.data, css, font]);

    useEffect(() => {
        if (!editor?.navbar) return editData({ navbar: { component: 'div', children: [], id: 'navbar-0' } });
        // if a navbar is not available, update the navbar with the default 
        setNavbarDom(constructDom(editor?.navbar, css, font));
    }, [editor?.navbar, css, font])

    return (
        <div className="flex p-1 h-full shadow-xl overflow-auto rounded-lg place-content-center ">
            <div onScroll={onScroll} className={`@container w-full p-2 border-2 md:min-w-[240px] border-gunmetal rounded-lg p-1 h-full overflow-auto md:resize-x`}>
                {navbarDom}
                {dom}
            </div>
        </div>
    )
};

export default Dom;