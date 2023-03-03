import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useUtil } from "../Context";

const Viewer = ({ doc, setDocs, docs }) => {

    const { setLoader } = useUtil();
    const [mounted, setMounted] = useState(false);

    const { id, ...newDocs } = doc;
    const [value, setValue] = useState();

    useEffect(() => {
        const { id, ...newDoc } = doc;
        setValue(newDoc);
    }, [doc]);

    const onMount = async (editor) => setMounted(true);

    useEffect(() => {
        if (!mounted) return setLoader(true);
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
            // if the value to change is the same as the doc, return
            if (val === JSON.stringify(newDocs)) return;


            const parsedDoc = JSON.parse(val);
            
            const index = docs.findIndex(doc => doc.id === id);

            if (index < 0) return;

            docs[index] = { ...parsedDoc, id };
            setDocs([ ...docs ]);
            setValue({ ...parsedDoc });
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
                value={JSON.stringify(value, null, 2)}
                onChange={onChange}
                onMount={onMount}
                options={config}
            />
        </div>

    )
};

export default Viewer;