import { createContext, useContext, useEffect, useState } from "react";
import { stringify } from 'himalaya';
import { useEditor } from "../Editor";
import { constructDom } from "./Converter";
import Parser from "./Parser";
import Toolbar from "./Toolbar";
import Dom from "./Dom";
import { MdSwapHoriz } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useUtil } from "../../../../Contexts/Util";

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {

    const { page, toggle, setToggle, css, setCss, font } = useEditor();
    const { pathname: origin } = useLocation();
    const { integrator } = useUtil();
    const [dom, setDom] = useState();
    const [string, setString] = useState();
    const [header, setHeader] = useState('div');
    
    const convertJSONtoCSS = (json = {}) => {
        let string = '';
        const entries = Object.entries(json);
        for (let i = 0; i < entries?.length; i++) {
            const [key, value] = entries[i];
            const converted = key?.split(/(?=[A-Z])/)?.join('-')?.toLowerCase();
            if (!converted && !value) continue;
            string += `${converted}: ${value};`;
            if (i < entries?.length - 1) string += ' ';
        };
        return string;
    };
    
    const convertCSStoJSON = (string = '') => {
        const object = {};
        for (const style of string?.split(';')) {
            const parts = style?.split(':');
            const value = [ ...[ ...style?.split(`${parts?.[0]}:`)]?.slice(1, parts?.length) ]?.join('');
            if (!parts?.[0] || !value) continue;
            const key = parts?.[0]?.trim()?.replace(/-([a-z])/ig, (_, l) => l?.toUpperCase());
            object[key] = value?.trim();
        };
        return object;
    };

    const convertJSONtoHimalayaJSON = (config, toggle = true) => {
        // we are basing this off our built in JSON
        let children = config.children;
        // divs, imgs, vids are exceptions
        if (config.component === 'div' || config.component === 'details') children = children?.map(child => convertJSONtoHimalayaJSON(child, toggle));
        else children = [{ type: 'text', content: config.children || '' }];

        let attributes = [];
        for (let [key, value] of Object.entries(config)) {
            if (key === 'id' || key === 'children' || key === 'component') continue;
            if (value instanceof Array && value?.length < 1) continue;
            if (typeof value === 'object' && Object.values(value)?.length < 1) continue;
            if (key === 'className') key = 'class';
            if (key === 'style') value = convertJSONtoCSS(value);
            // brand new convert function
            attributes.push({ key, value });
        };

        // we are returning a {} consistent with himalaya JSON
        return { tagName: config.component, attributes, children };
        // ids are not necessary because we do not display them any way
    };

    const convertHimalayaJSONtoJSON = (config, id = '0') => {

        let children = config.children;
        console.log('children', config);
        // divs, imgs, vids are exceptions
        if (config.tagName === 'div' || config.tagName === 'details') children = children.filter(child => child.type === 'element')?.map((child, i) => convertHimalayaJSONtoJSON(child, `${id}-${i}`)) || [];
        else if (config.tagName === 'img') children = null;
        else children = children.find(child => child.type === 'text')?.content || '';
        // himalaya json follows this format

        let attributes = {};
        for (let { key, value } of config.attributes) {
            if (key === 'id') continue;
            if (!key || !value) continue;
            if (key === 'class') key = 'className';
            if (key === 'style') value = convertCSStoJSON(value);
            // brand new convert function
            attributes[`${key}`] = value;
        };

        // we are returning a {} consistent with the built in format
        return { component: config.tagName, children, id, ...attributes };
    };

    useEffect(() => {
        if (!page?.data || !page?.id) return;
        const convertedHimalayaJSON = convertJSONtoHimalayaJSON(page?.data);
        if (!convertedHimalayaJSON) return;
        const stringifiedHimalayaJSONHeader = stringify([{ ...convertedHimalayaJSON, children: [] }]);
        console.log('header to set', stringifiedHimalayaJSONHeader?.split('</')?.[0] || '<div>')
        setHeader(stringifiedHimalayaJSONHeader?.split('</')?.[0] || '<div>');
    }, [page?.data. page?.id]);

    useEffect(() => {
        try {
            if (integrator?.active && integrator?.origin === `${origin}?mode=codebase`) return;
            if (!page?.data || !page?.id) return;
            const convertedHimalayaJSON = convertJSONtoHimalayaJSON(page?.data);
            if (!convertedHimalayaJSON) return;
            // const stringifiedHimalayaJSONHeader = stringify([{ ...convertedHimalayaJSON, children: [] }]);
            // console.log('header to set', stringifiedHimalayaJSONHeader?.split('</')?.[0] || '<div>')
            // setHeader(stringifiedHimalayaJSONHeader?.split('</')?.[0] || '<div>');
            // instead of creating a wrapper func, it's possible to just return its children
            const stringifiedHimalayaJSON = stringify(convertedHimalayaJSON?.children || []);
            if (!stringifiedHimalayaJSON) return;
            const cDom = constructDom(page?.data, toggle, css, font);
            setString(stringifiedHimalayaJSON);
            setDom(cDom);
        } catch {
            console.error('Could not create dom.');
            return;
        }
    }, [page?.id, toggle, css, font])

    const values = { 
        convertJSONtoHimalayaJSON, convertHimalayaJSONtoJSON,
        dom, setDom, string, setString, toggle, setToggle, css, setCss,
        header, setHeader
    };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};

const Codebase = () => {

    const [parser, setParser] = useState(true);

    return (
        <DomContext>
            <div className="grid grid-rows-[auto_minmax(0,_1fr)] md:grid-rows-[minmax(0,_1fr)_auto] p-2 gap-1">
                <div className="order-2 md:order-1 grid grid-cols-1 md:grid-cols-[40%_60%] gap-1">

                    <div className={`${parser ? 'grid' : 'hidden'} md:grid grid-rows-[minmax(0,_1fr)_auto] md:grid-rows-1 overflow-hidden`}>
                        <Parser />
                        <div onClick={() => setParser(false)} className="flex md:hidden items-center place-content-center m-2 rounded-lg text-gunmetal border border-gunmetal select-none hover:scale-[.98]">
                            <MdSwapHoriz size="30px" />
                            <h1 className="text-2xl">Switch to Dom</h1>
                        </div>
                    </div>
                    
                    <div className={`${parser ? 'hidden' : 'grid'} md:grid grid-rows-[minmax(0,_1fr)_auto] md:grid-rows-1`}>
                        <Dom />
                        <div onClick={() => setParser(true)} className="flex md:hidden items-center place-content-center m-2 rounded-lg text-gunmetal border border-gunmetal select-none hover:scale-[.98]">
                            <MdSwapHoriz size="30px" />
                            <h1 className="text-2xl">Switch to Parser</h1>
                        </div>
                    </div>

                </div>

                <Toolbar/>
            </div>
        </DomContext>

    )
};

export default Codebase;
