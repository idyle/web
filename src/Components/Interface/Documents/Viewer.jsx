import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useUtil } from "../../../Contexts/Util";

const Viewer = ({ doc, setDocs, docs }) => {

    const { setLoader } = useUtil();
    const [mounted, setMounted] = useState(false);

    const { id, ...newDocs } = doc;
    const [value, setValue] = useState();
    const [string, setString] = useState();

    useEffect(() => {
        const { id, ...newDoc } = doc;
        setValue(newDoc);
        setString(JSON.stringify(newDoc));
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
            const parsedDoc = JSON.parse(val);
            // if the value to change is the same as the doc, return
            console.log('val', JSON.stringify(parsedDoc) , 'stringifed', JSON.stringify(newDocs), 'test', JSON.stringify(parsedDoc)  === JSON.stringify(newDocs));
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

    const prettify = () => {
        console.log('prettifiyg', value);
        setString(JSON.stringify(value, null, 2));
    };

    return (
        <div onBlur={prettify} className="transition animate-fadein duration-300 border border-black p-3 shadow-xl rounded-lg overflow-hidden">
            <Editor 
                className="" 
                loading="" 
                defaultLanguage="json"
                fixedOverflowWidgets={true}
                value={string}
                onChange={onChange}
                onMount={onMount}
                options={config}
            />
        </div>

    )
};

export default Viewer;