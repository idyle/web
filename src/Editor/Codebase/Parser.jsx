import Monaco from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { useState, useRef, useEffect } from "react";
import { useEditor } from "../Editor";
import { useUtil } from "../../Contexts/Util";
import { constructDom, renderElements } from "./Converter";
import { useDom } from "./Codebase";
import { parse } from "himalaya";

const Parser = () => {
    const { page, setPageData } = useEditor();
    const { setLoader } = useUtil();
    const { string, toggle, css, setDom, convertHimalayaJSONtoJSON } = useDom();
    const [mounted, setMounted] = useState();
    const editorRef = useRef();

    useEffect(() => {
        if (!page?.data) return;
        if (!mounted) setLoader(true);
        else setLoader(false);
    }, [mounted]);

    const beforeMount = (monaco) => emmetHTML(monaco);
    const onMount = (editor) => {
        console.log('editor, ', editor, editor.getPosition());
        editor.getAction('editor.action.formatDocument')?.run();
        setMounted(true);
        editorRef.current = editor;
    };

    const onChange = (editorValue) => {
        const parsedHimalayaJSON = parse(`<div>${editorValue}</div>`);
        // output string
        console.log('parsed himalaya json', parsedHimalayaJSON);

        const builtInJSON = convertHimalayaJSONtoJSON(parsedHimalayaJSON[0]);
        console.log('standard json', builtInJSON);

        if (!builtInJSON) return;
        setPageData({ ...builtInJSON });
        setDom(constructDom(builtInJSON, toggle, css));
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
        defaultValue={string}
        onChange={onChange}
        onMount={onMount}
        beforeMount={beforeMount}
        options={{ minimap: { enabled: false }, wrappingIndent: 'indent', wordWrap: 'on' }}
        /> 
    )
};

export default Parser;