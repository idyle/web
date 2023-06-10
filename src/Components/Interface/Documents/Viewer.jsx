import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useUtil } from "../../../Contexts/Util";

const Viewer = ({ doc, setDocs, docs }) => {

    const { load } = useUtil();
    const [mounted, setMounted] = useState(false);

    const { id, ...newDocs } = doc;
    const [value, setValue] = useState();
    const [string, setString] = useState();

    useEffect(() => {
        const { id, ...newDoc } = doc;
        setValue(newDoc);
        setString(JSON.stringify(newDoc, null, 2));
    }, [doc]);

    const onMount = async (editor) => {
        setString(JSON.stringify(value, null, 2));
        setMounted(true)
    };

    useEffect(() => {
        setString(JSON.stringify(value, null, 2));
        if (!mounted) return load(true);
        load(false);
        
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
            const parsedDoc = JSON.parse(val);
            if (JSON.stringify(parsedDoc) === JSON.stringify(newDocs)) return;
            const index = docs.findIndex(doc => doc.id === id);
            if (index < 0) return;
            docs[index] = { ...parsedDoc, id };
            setDocs([ ...docs ]);
            setValue({ ...parsedDoc });
            // setString(JSON.stringify(parsedDoc));
        } catch {
            return;
        }
    };

    const beforeMount = () => setString(JSON.stringify(value, null, 2));

    const prettify = () => {
        setString(JSON.stringify(value, null, 2));
    };

    return (
        <div onBlur={prettify} className="order-2 md:order-1 transition animate-fadein duration-300 border border-black p-3 shadow-xl rounded-lg overflow-hidden">
            <Editor 
                className="" 
                loading="" 
                defaultLanguage="json"
                fixedOverflowWidgets={true}
                value={string}
                autoIndent={true}
                formatOnPaste={true}
                formatOnType={true}
                onChange={onChange}
                beforeMount={beforeMount}
                onMount={onMount}
                options={config}
            />
        </div>

    )
};

export default Viewer;