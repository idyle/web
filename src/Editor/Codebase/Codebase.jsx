import { createContext, useContext, useEffect, useState } from "react";
import { parse, stringify } from 'himalaya';
import { useEditor } from "../Editor";
import { constructDom, renderElements } from "./Converter";
import Parser from "./Parser";
import Toolbar from "./Toolbar";
import Dom from "./Dom";
import { useLocation } from "react-router-dom";
import { useUtil } from "../../Contexts/Util";

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {

    const { page, toggle, setToggle, css, setCss } = useEditor();
    const { pathname: origin } = useLocation();
    const { integrator } = useUtil();
    const [dom, setDom] = useState();
    const [string, setString] = useState();

    const convertJSONtoHimalayaJSON = (config, toggle = true) => {
        // we are basing this off our built in JSON
        let children = config.children;
        // divs, imgs, vids are exceptions
        if (config.component === 'div') children = children?.map(child => convertJSONtoHimalayaJSON(child, toggle));
        else children = [{ type: 'text', content: config.children || '' }];

        let attributes = [];
        for (let [key, value] of Object.entries(config)) {
            if (key === 'id' || key === 'children' || key === 'component') continue;
            if (key === 'className') key = 'class';
            if (key === 'className' && !toggle) value = '';
            if (key === 'style') value = JSON.stringify(value).slice(1, -1);
            attributes.push({ key, value });
        };

        // we are returning a {} consistent with himalaya JSON
        return { tagName: config.component, attributes, children };
        // ids are not necessary because we do not display them any way
    };

    const convertHimalayaJSONtoJSON = (config, id = '0') => {

        let children = config.children;
        // divs, imgs, vids are exceptions
        if (config.tagName === 'div') children = children.filter(child => child.type === 'element')?.map((child, i) => convertHimalayaJSONtoJSON(child, `${id}-${i}`)) || [];
        else if (config.tagName === 'img') children = null;
        else children = children.find(child => child.type === 'text')?.content || '';
        // himalaya json follows this format

        let attributes = {};
        for (let {key, value} of config.attributes) {
            if (key === 'id') continue;
            if (key === 'class') key = 'className';
            if (key === 'style') console.log(key, 'value', value);
            if (key === 'style') value = JSON.parse(`{${value}}`);
            attributes[`${key}`] = value;
        };

        // we are returning a {} consistent with the built in format
        return { component: config.tagName, children, id, ...attributes };
    };

    useEffect(() => {
        try {
            if (integrator?.active && integrator?.origin === `${origin}?mode=codebase`) return;
            // if a page is not selected 
            // if (!page?.data) return navigate('/editor/pages');
            // from JSON into string
            if (!page?.data || !page?.id) return;
            const convertedHimalayaJSON = convertJSONtoHimalayaJSON(page?.data);
            if (!convertedHimalayaJSON || !convertedHimalayaJSON?.tagName) return;
            console.log('CONVERTED', convertedHimalayaJSON)
            // instead of creating a wrapper func, it's possible to just return its children
            const stringifiedHimalayaJSON = stringify(convertedHimalayaJSON?.children || []);
            if (!stringifiedHimalayaJSON) return;
            setString(stringifiedHimalayaJSON);
            setDom(constructDom(page?.data, toggle, css));
        } catch (e) {
            console.log(e);
            return;
        }
    }, [page?.id, toggle, css])

    const values = { 
        convertJSONtoHimalayaJSON, convertHimalayaJSONtoJSON,
        dom, setDom, string, setString, toggle, setToggle, css, setCss
    };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};

const Codebase = () => {

    return (
        <DomContext>
        <div className="grid grid-rows-[minmax(0,_1fr)_auto] p-2 gap-1">
            <div className="grid grid-cols-[40%_60%] gap-1">
                <div className="shadow-xl rounded-lg overflow-hidden">
                    <Parser />
                </div>
                
                <Dom />
            </div>

            <Toolbar />
        </div>
        </DomContext>

    )
};

export default Codebase;
