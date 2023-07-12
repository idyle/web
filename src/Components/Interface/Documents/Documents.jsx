import { Helmet } from "react-helmet";
import Viewer from "./Viewer";
import { AiOutlinePlus, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import Document from "./Document";
import { useState } from "react";
import { useAuth } from "../../../Contexts/Auth";
import { useUtil } from "../../../Contexts/Util";
import { removeDoc, setDoc } from "./requests";
import { useData } from "../../../Contexts/Data";

const Documents = () => {

    const { load, notify } = useUtil();
    const { getToken } = useAuth();
    const { docs, setDocs } = useData();
    const [selectedDoc, setSelectedDoc] = useState();
    const [mobileClicked, setMobileClicked] = useState(false);

    const onClick = (e) => {
        const newDoc = docs.find(({ id }) => id === e.currentTarget.id);
        if (!newDoc) return;
        const stagedDoc = { ...newDoc, id: e.currentTarget.id };
        setSelectedDoc({ ...stagedDoc });
        setMobileClicked(true);
    };

    const add = () => {
        const id = Math.random().toString(36).slice(-10);
        setDocs([ ...docs, { id } ]);
    };

    const check = async () => {
        const token = await getToken();
        if (!token || !selectedDoc?.id) return;
        const actualDoc = docs.find(({ id }) => id === selectedDoc?.id);
        if (!actualDoc) return notify('Something went wrong...');
        load(true);
        const op = await setDoc(token, actualDoc);
        load(false);
        if (!op) return notify('Something went wrong...');
        return notify('Successfully updated doc');
    };

    const remove = async () => {
        const token = await getToken();
        if (!token || !selectedDoc?.id) return;
        load(true);
        const op = await removeDoc(token, selectedDoc.id);
        load(false);
        if (!op) return notify('Something went wrong...');
        setSelectedDoc();
        setDocs(docs.filter(({ id }) => id !== selectedDoc.id));
        return notify('Successfully removed doc');
    };

    return (
        <div className='grid m-2 mx-5'>

            <Helmet>
                <title>idyle - Documents</title>
                <meta name="description" content="" />
                <meta name="keywords" content="Documents" />
                <link rel="canonical" href="/docs" />
            </Helmet>
            
            <div className="grid md:grid-cols-2 md:gap-3 md:overflow-auto">

                 <div className={`${!mobileClicked ? 'grid' : 'hidden'} md:grid px-3 md:overflow-auto grid-rows-[auto_minmax(0,_1fr)]`}>
                    <div className="flex items-center justify-between bg-gunmetal text-white rounded-lg p-2 select-none">
                        <h1 className="text-3xl justify-self-start text-inherit font-bold">Documents</h1>
                        <AiOutlinePlus onClick={add} className="text-inherit hover:bg-white/20 rounded-full" size="30px" />
                    </div>

                    <div className="grid p-3 md:gap-2 overflow-auto auto-rows-min">
                        {
                            docs.map((ownDoc, i) => (<Document key={`d${i}`} doc={ownDoc} currentDoc={selectedDoc} onClick={onClick} />))
                        }
                    </div>
                </div> 

                {/* selected doc dictates init */}
                { selectedDoc ? <div className={`${mobileClicked ? 'grid' : 'hidden'} md:grid overflow-hidden md:gap-2 grid-rows-[auto_minmax(0,_1fr)] md:grid-rows-[minmax(0,_1fr)_auto] bg-transparent`}>
                    <Viewer doc={selectedDoc} docs={docs} setDocs={setDocs} />
                    <div className="order-1 md:order-2 flex items-center justify-between rounded-lg p-2 select-none bg-black text-blue">
                        <h1 className="text-2xl md:text-3xl text-inherit font-bold">Doc: {selectedDoc?.id || 'Doc'}</h1>
                        <div className="flex items-center gap-1">
                            <AiFillDelete onClick={remove} className="text-inherit" size="30px" />
                            <AiOutlineCheck onClick={check} className="text-inherit" size="30px" />
                            <div onClick={() => setMobileClicked(false)} className="flex md:hidden items-center rounded-lg p-1 bg-gunmetal text-white select-none hover:scale-[.98]">
                                <h1 className="text-xl text-center">Back</h1>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="hidden md:grid items-center justify-items-center border border-black rounded-lg">
                    <h1 className="text-5xl text-center">Select a document.</h1>
                </div> }
                
            </div>
        </div>
    )
};

export default Documents;