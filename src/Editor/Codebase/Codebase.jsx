import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { parse, stringify } from 'himalaya';
import { useEditor } from "../Editor";
import { renderElements } from "./Converter";
import { useUtil } from '../../Contexts/Util';
import { useNavigate } from "react-router-dom";

const Codebase = () => {

    const navigate = useNavigate();
    const { page, setPageData } = useEditor();

    // in handling json, codebase should UPDATE json on every change, but not TAKE from it (to prevent infinite call)
    // instead, an internal JSON should be used, in which a "data update" should occur during init

    const [dom, setDom] = useState();
    const [string, setString] = useState();
    const [toggle, setToggle] = useState(true);

    // on init: convert main JSON into string
    // on usage: convert string into JSON

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
            attributes.push({ key, value });
        };

        // we are returning a {} consistent with himalaya JSON
        return { tagName: config.component, attributes, children };
        // ids are not necessary because we do not display them any way
    };
    
    const convertJSONtoHimalayaJSONArray = (config, toggle = true) => {
        let elements = [];
        let children = config?.children;
        if (children instanceof Array) for (const child of children) elements.push(convertJSONtoHimalayaJSON(child, toggle));
        return elements;
    };

    useEffect(() => {
        // if a page is not selected 
        // if (!page?.data) return navigate('/editor/pages');

        // from JSON into string

        const convertedHimalayaJSON = convertJSONtoHimalayaJSONArray(page?.data);
        const stringifiedHimalayaJSON = stringify(convertedHimalayaJSON);
        setString(stringifiedHimalayaJSON);
        if (page?.data) setDom(renderElements(page?.data, toggle));
    }, [page?.id])


    const onChange = (editorValue, event ) => {
        editorRef?.current?.getAction('editor.action.formatDocument')?.run();

        const convertHimalayaJSONtoJSON = (config, id = '0') => {

            let children = config.children;
            // divs, imgs, vids are exceptions
            if (config.tagName === 'div') children = children.filter(child => child.type === 'element')?.map((child, i) => convertHimalayaJSONtoJSON(child, `${id}-${i}`)) || [];
            else if (config.tagName === 'img') children = null;
            else children = children.find(child => child.type === 'text')?.content || '';
            // himalaya json follows this format
            console.log('CHILD DURING PARSE', children, config.children);

            let attributes = {};
            for (let {key, value} of config.attributes) {
                if (key === 'id') continue;
                if (key === 'class') key = 'className';
                attributes[`${key}`] = value;
            };

            // we are returning a {} consistent with the built in format
            return { component: config.tagName, children, id, ...attributes };
        };

        const parsedHimalayaJSON = parse(`<div class=''>${editorValue}</div>`);
        // output string
        console.log('parsed himalaya json', parsedHimalayaJSON);

        const builtInJSON = convertHimalayaJSONtoJSON(parsedHimalayaJSON[0]);
        console.log('standard json', builtInJSON);

        if (!builtInJSON) return;

        setPageData({ ...builtInJSON });

        setDom(renderElements(builtInJSON, toggle));

    };

    const { setLoader } = useUtil();
    const [mounted, setMounted] = useState();

    const editorRef = useRef();

    const onMount = (editor) => {
        console.log('editor, ', editor, editor.getPosition());
        editor.getAction('editor.action.formatDocument')?.run();
        setMounted(true);
        editorRef.current = editor;
    };

    const beforeMount = (monaco) => emmetHTML(monaco);

    useEffect(() => {
        if (!page?.data) return;
        if (!mounted) setLoader(true);
        else setLoader(false);
    }, [mounted]);

    const toggleTailwind = () => {
        setToggle(!toggle);
        setDom(renderElements(page?.data, !toggle));

    };

    return (
        <div className="grid grid-rows-[minmax(0,_1fr)_auto] p-2 gap-1">
            <div className="grid grid-cols-[40%_60%] gap-1">
                <div className="shadow-xl rounded-lg overflow-hidden">
                <Editor
                className="transition animate-fadein duration-300"                
                loading=""
                theme="vs-dark"
                defaultLanguage="html"
                value={string}
                defaultValue={string}
                onChange={onChange}
                onMount={onMount}
                beforeMount={beforeMount}
                options={{ minimap: { enabled: false }, wrappingIndent: 'indent', wordWrap: 'on' }}
                /> 
                </div>

                <div className="grid p-2 overflow-auto shadow-xl rounded-lg border border-black">
                    {dom}
                </div>
            </div>

            <div onClick={toggleTailwind} className="grid grid-flow-col border border-black rounded-lg p-1 gap-2">
                <div className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98]">
                    <h1 className="text-2xl">Toggle Tailwind CSS ({toggle ? 'ON' : 'OFF'})</h1>
                </div>
                <div className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98]">
                    <h1 className="text-2xl">Import Custom CSS File</h1>
                </div>
                <div className="flex items-center place-content-center bg-black text-white p-0.5 rounded-lg select-none hover:scale-[.98]">
                    <h1 className="text-2xl">Convert Docs to HTML</h1>
                </div>
            </div>
        </div>


    )
};

export default Codebase;
