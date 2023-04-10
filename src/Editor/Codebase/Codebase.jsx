import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { parse, stringify } from 'himalaya';
import { useEditor } from "../Editor";
import { renderElements } from "./Converter";
import { useUtil } from "../../Context";
import { useNavigate } from "react-router-dom";

const Codebase = () => {

    const navigate = useNavigate();
    const { page, setPageData } = useEditor();

    // in handling json, codebase should UPDATE json on every change, but not TAKE from it (to prevent infinite call)
    // instead, an internal JSON should be used, in which a "data update" should occur during init

    const [dom, setDom] = useState();
    const [string, setString] = useState();

    // on init: convert main JSON into string
    // on usage: convert string into JSON

    useEffect(() => {
        // if a page is not selected 
        if (!page?.data) return navigate('/editor/pages');

        // from JSON into string

        const convertJSONtoHimalayaJSON = (config) => {
            // we are basing this off our built in JSON
            let children = config.children;
            if (config.component === 'h1') children = [{ type: 'text', content: config.children || '' }];
            else children = children?.map(child => convertJSONtoHimalayaJSON(child));

            let attributes = [];
            for (let [key, value] of Object.entries(config)) {
                if (key === 'id' || key === 'children' || key === 'component') continue;
                if (key === 'className') key = 'class';
                attributes.push({ key, value });
            };

            // we are returning a {} consistent with himalaya JSON
            return { tagName: config.component, attributes, children };
            // ids are not necessary because we do not display them any way
        };
        
        const convertJSONtoHimalayaJSONArray = (config) => {
            let elements = [];
            let children = config?.children;
            if (children instanceof Array) for (const child of children) elements.push(convertJSONtoHimalayaJSON(child));
            return elements;
        };

        const convertedHimalayaJSON = convertJSONtoHimalayaJSONArray(page?.data);
        const stringifiedHimalayaJSON = stringify(convertedHimalayaJSON);
        setString(stringifiedHimalayaJSON);
        setDom(renderElements(page?.data));
    }, [])


    const onChange = (editorValue, event ) => {
        editorRef?.current?.getAction('editor.action.formatDocument')?.run();

        const convertHimalayaJSONtoJSON = (config, id = '0') => {

            let children = config.children;
            if (config.tagName === 'h1') children = children.find(child => child.type === 'text')?.content || '';
            else if (config.tagName === 'img') children = null;
            else children = children.filter(child => child.type === 'element')?.map((child, i) => convertHimalayaJSONtoJSON(child, `${id}-${i}`)) || [];
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

        setDom(renderElements(builtInJSON));

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

    return (
        <div className="grid grid-cols-[40%_60%]">
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

            <div className="grid p-2 overflow-auto shadow-xl rounded-lg m-1">
                {dom}
            </div>
        </div>

    )
};

export default Codebase;
