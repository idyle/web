import Monaco from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { useState, useRef, useEffect } from "react";
import { useEditor } from "../Editor";
import { useUtil } from "../../../../Contexts/Util";
import { constructDom, renderElements } from "./Converter";
import { useDom } from "./Codebase";
import { parse } from "himalaya";

const Parser = () => {
    const { page, setPageData, font } = useEditor();
    const { load } = useUtil();
    const { string, toggle, css, setDom, convertHimalayaJSONtoJSON } = useDom();
    const [mounted, setMounted] = useState();
    const editorRef = useRef();

    useEffect(() => {
        if (!page?.data) return;
        if (!mounted) return load(true);
        // editorRef.getAction('editor.action.formatDocument')?.run();
        load(false);
    }, [mounted]);

    const beforeMount = (monaco) => emmetHTML(monaco);
    const onMount = (editor) => {
        editor.getAction('editor.action.formatDocument')?.run();
        editorRef.current = editor;
        setMounted(true);
    };

    const onChange = (editorValue) => {
        const parsedHimalayaJSON = parse(`<div>${editorValue}</div>`);
        // output string
        const builtInJSON = convertHimalayaJSONtoJSON(parsedHimalayaJSON[0]);
        if (!builtInJSON) return;
        setPageData({ ...builtInJSON });
        setDom(constructDom(builtInJSON, toggle, css, font, 'PARSER'));
        // it's now possible to setDom() without classes while also saving 
        // a different case where the classes are presevered
    };

    return (
        <Monaco
        className="transition animate-fadein duration-300"                
        loading=""
        theme="vs-dark"
        defaultLanguage="html"
        value={string}
        fixedOverflowWidgets={true}
        defaultValue={string}
        autoIndent={true}
        formatOnPaste={true}
        formatOnType={true}
        onChange={onChange}
        onMount={onMount}
        beforeMount={beforeMount}
        options={{ minimap: { enabled: false }, wrappingIndent: 'indent', wordWrap: 'on' }}
        /> 
    )
};

export default Parser;