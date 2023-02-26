import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useUtil } from "../Context";

const Viewer = () => {

    const { setLoader } = useUtil();
    const [mounted, setMounted] = useState(false);
    const editorRef = useRef();

    const obj = {
        'hello': 'test',
        hi: 'yay'
    };

    const [val, setVal] = useState('');

    const onMount = async (editor) => {
        console.log('on mount triggered',editor.getValue());
        setVal(JSON.stringify(obj));
        await editor.getAction('editor.action.formatDocument').run();
        setVal(JSON.stringify(obj));
        setMounted(true);
        editorRef.current = editor;
    };

    useEffect(() => {
        if (!mounted) return setLoader(true);
        editorRef.current.getAction('editor.action.formatDocument').run();
        setLoader(false);
    }, [mounted]);

    const config = {
        minimap: { enabled: false },
        wrappingIndent: 'indent',
        wordWrap: 'on',
        lineNumbers: 'off',
        glyphMargin: false,
        fontSize: '20px',
        renderLineHighlight: 'none'
    };

    const onChange = async (val) => {

        try {
            const parsed = JSON.parse(val);
            if (!parsed) return;
            console.log(parsed);
        } catch {
            return;
        }
    };




    return (
        <div className="transition animate-fadein duration-300 border border-black p-3 shadow-xl rounded-lg overflow-hidden">
        <Editor
        className=""
            loading=""
            defaultLanguage="json"
            value={val}
            onChange={onChange}
            onMount={onMount}
            options={config}

        />
        </div>

    )
};

export default Viewer;