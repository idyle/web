import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { parse, stringify } from 'himalaya';
import { useEditor } from "../Editor";
import { renderElements } from "./Converter";
import { renderToString } from "react-dom/server";
import { format } from 'prettier';
import parseHtml from 'prettier/parser-html';
import { useUtil } from "../../Context";

const Codebase = () => {

    const { JSON, setJSON } = useEditor();
    const [dom, setDom] = useState();
    const [string, setString] = useState();

    useEffect(() => {
        // when our JSON edits, we have to rerender our dom

        const convertJSONtoHimalayaJSON = (config) => {
            // we are basing this off our built in JSON
            let children = config.children;
            if (config.component === 'h1') children = [{ type: 'text', content: config.children || '' }];
            else children = children?.map(child => convertJSONtoHimalayaJSON(child));
            console.log('our config', config);

            let attributes = [];
            for (let [key, value] of Object.entries(config)) {
                console.log('testing key val', key, value)
                if (key === 'id' || key === 'children' || key === 'component') continue;
                if (key === 'className') key = 'class';
                attributes.push({ key, value });
            };

            // we are returning a {} consistent with himalaya JSON
            return { tagName: config.component, attributes, children };
            // ids are not necessary because we do not display them any way
        };

        const convertHimalayaJSONtoJSON = (config, id = '0') => {

            let children = config.children;
            if (config.tagName === 'h1') children = children.find(child => child.type === 'text')?.value || '';
            else if (config.tagName === 'img') children = null;
            else children = children.filter(child => child.type === 'element')?.map((child, i) => convertHimalayaJSONtoJSON(child, `${id}-${i}`)) || [];
            // himalaya json follows this format


            let attributes = {};
            for (let {key, value} of config.attributes) {
                console.log(key, value, 'himalaya -> json');
                if (key === 'id') continue;
                if (key === 'class') key = 'className';
                attributes[`${key}`] = value;
            };

            // we are returning a {} consistent with the built in format
            return { component: config.tagName, children, id, ...attributes };
        };

        setDom(renderElements(JSON));
        console.log('DOM THAT IS SET', dom);

        const convertedHimalayaJSON = convertJSONtoHimalayaJSON(JSON);

        console.log('JSON EXAMPLE', convertedHimalayaJSON);

        const stringifiedHimalayaJSON = stringify([convertedHimalayaJSON]);
        const formattedString = format(stringifiedHimalayaJSON, {
            parser: "html",
            plugins: [parseHtml]
        });
        console.log('STRINGIFED EXAMPLE', formattedString);

        setString(formattedString);


        const convertJSONtoHimalayaJSONs = (config) => {
            // h1 can only have children has text
            
            // for h1 and div: attributes[] find key: 'class' only [{ key: 'class', value: '' }]

            // h1: children (first child -> must be { type: 'text' or ''})
            // div: children (all children -> must be { type: 'element' }) (filter)

            let children = config.children;
            if (children instanceof Array) {
                if (config.tagName === 'h1') children = children.find(child => child.type === 'text')?.value || '';
                else children = children.filter(child => child.type === 'element').map(child => convertJSONtoHimalayaJSON(child));
                console.log('amended children', children)
            };
            let className = config.attributes;
            return { component: config.tagName, children, className }

        }
    }, [JSON]);

    const [provisionedString, setProvisionedString] = useState('');



    const onChange = (editorValue, event ) => {
        const parsedHimalayaJSON = parse(editorValue);

        console.log('parsed himalaya json', parsedHimalayaJSON);

        const convertHimalayaJSONtoJSON = (config, id = '0') => {

            let children = config.children;
            if (config.tagName === 'h1') children = children.find(child => child.type === 'text')?.value || '';
            else if (config.tagName === 'img') children = null;
            else children = children.filter(child => child.type === 'element')?.map((child, i) => convertHimalayaJSONtoJSON(child, `${id}-${i}`)) || [];
            // himalaya json follows this format


            let attributes = {};
            for (let {key, value} of config.attributes) {
                console.log(key, value, 'himalaya -> json');
                if (key === 'id') continue;
                if (key === 'class') key = 'className';
                attributes[`${key}`] = value;
            };

            // we are returning a {} consistent with the built in format
            return { component: config.tagName, children, id, ...attributes };
        };

        const builtInJSON = convertHimalayaJSONtoJSON(parsedHimalayaJSON[0]);

        console.log('transferred built in json', builtInJSON);

        if (builtInJSON) setJSON({ ...builtInJSON });

        // we need to find a way to mass-assign the ids
        // @ JSON change
    };

    const { setLoader } = useUtil();
    const [mounted, setMounted] = useState();

    const onMount = () => setMounted(true);

    const test = () => console.log('TRIGGERED');

    const beforeMount = (monaco) => emmetHTML(monaco);

    useEffect(() => {
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
                onKeyDown={test}
                value={string}
                defaultValue={string}
                onChange={onChange}
                onMount={onMount}
                beforeMount={beforeMount}
                options={{ minimap: { enabled: false } }}
            />
            </div>

            <div className="grid p-2 overflow-auto shadow-xl rounded-lg m-1">
                {dom}
            </div>
        </div>

    )
};

export default Codebase;
