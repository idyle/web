import { Helmet } from "react-helmet";
import Viewer from "./Viewer";
import { AiOutlinePlus, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import Document from "./Document";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/Auth";
import { useUtil } from "../../../Contexts/Util";
import { listDocs, removeDoc, setDoc } from "./requests";
import { useData } from "../../../Contexts/Data";

const Documents = () => {

    const { setLoader, notify } = useUtil();
    const { user } = useAuth();
    const { docs, setDocs } = useData();

    // const [docs, setDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState();

    const onClick = (e) => {
        const newDoc = docs.find(({ id }) => id === e.currentTarget.id);
        if (!newDoc) return;
        const stagedDoc = { ...newDoc, id: e.currentTarget.id };
        setSelectedDoc({ ...stagedDoc });
    };

    const add = () => {
        const id = Math.random().toString(36).slice(-10);
        setDocs([ ...docs, { id } ]);
    };

    const check = async () => {
        if (!user?.accessToken || !selectedDoc?.id) return;
        const actualDoc = docs.find(({ id }) => id === selectedDoc?.id);
        if (!actualDoc) return notify('Something went wrong...');
        setLoader(true);
        const op = await setDoc(user?.accessToken, actualDoc);
        setLoader(false);
        if (!op) return notify('Something went wrong...');
        return notify('Successfully updated doc');
    };

    const remove = async () => {
        if (!user?.accessToken || !selectedDoc?.id) return;
        setLoader(true);
        const op = await removeDoc(user?.accessToken, selectedDoc.id);
        setLoader(false);
        if (!op) return notify('Something went wrong...');
        setSelectedDoc();
        setDocs(docs.filter(({ id }) => id !== selectedDoc.id));
        return notify('Successfully removed doc');
    };

    // useEffect(() => {
    //     setLoader(true);
    //     if (!user?.accessToken) return setLoader(false);
    //     (async () => {
    //         const list = await listDocs(user?.accessToken);
    //         if (!list) return setLoader(false);;
    //         setDocs([ ...list ]);
    //         return setLoader(false);
    //     })();
    // }, [user?.accessToken]);

    return (
        <div className='grid m-5'>

            <Helmet>
                <title>idyle - Documents</title>
                <meta name="description" content="" />
                <meta name="keywords" content="Documents" />
                <link rel="canonical" href="/docs" />
            </Helmet>
            
            <div className="grid grid-rows-[30%_70%] md:grid-rows-1 md:grid-cols-2 md:gap-3 overflow-hidden">

                <div className="grid px-3 overflow-auto grid-rows-[auto_minmax(0,_1fr)]">
                    <div className="flex items-center justify-between bg-black rounded-lg text-white p-2 select-none">
                        <h1 className="text-3xl justify-self-start text-inherit">Documents</h1>
                        <AiOutlinePlus onClick={add} className="text-inherit" size="30px" />
                    </div>

                    <div className="grid p-3 md:gap-2 overflow-auto auto-rows-min">
                        {
                            docs.map((ownDoc, i) => (<Document key={`d${i}`} doc={ownDoc} currentDoc={selectedDoc} onClick={onClick} />))
                        }

                    </div>
                </div>

                { selectedDoc ? <div className="grid overflow-hidden md:gap-2 grid-rows-[minmax(0,_1fr)_auto]">
                    <Viewer doc={selectedDoc} docs={docs} setDocs={setDocs} />
                    <div className="flex items-center border border-black justify-between rounded-lg p-2 select-none">
                        <h1 className="text-3xl text-inherit">Document</h1>
                        <div className="flex items-center gap-1">
                            <AiFillDelete onClick={remove} className="text-inherit" size="30px" />
                            <AiOutlineCheck onClick={check} className="text-inherit" size="30px" />
                        </div>
                    </div>
                </div> :
                <div className="grid items-center justify-items-center border border-black rounded-lg">
                    <h1 className="text-5xl">Select a doc</h1>
                </div>

                }
                
            </div>

        </div>
    )
};

export default Documents;