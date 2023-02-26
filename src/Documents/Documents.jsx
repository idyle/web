import { Helmet } from "react-helmet";
import Viewer from "./Viewer";
import { AiOutlinePlus, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import Document from "./Document";

const Documents = () => {
    return (
        <div className='grid m-5'>

            <Helmet>
                <title>Documents</title>
            </Helmet>
            
            <div className="grid grid-cols-2 gap-3 overflow-auto">
                <div className="grid px-3 overflow-auto">
                    <div className="flex items-center justify-between bg-black rounded-lg text-white p-2 select-none">
                        <h1 className="text-3xl justify-self-start text-inherit">Documents</h1>
                        <AiOutlinePlus className="text-inherit" size="30px" />
                    </div>

                    <div className="grid p-3 gap-2 overflow-auto">
                        {
                            [...Array(30).keys()].map(() => (<Document />))
                        }


                    </div>
                </div>

                    <div className="grid overflow-hidden gap-2 grid-rows-[minmax(0,_1fr)_auto]">
                    <Viewer />
                    <div className="flex items-center border border-black justify-between rounded-lg p-2 select-none">
                        <h1 className="text-3xl text-inherit">Document</h1>
                        <div className="flex items-center gap-1">
                            <AiFillDelete className="text-inherit" size="30px" />
                            <AiOutlineCheck className="text-inherit" size="30px" />
                        </div>
                    </div>
                    </div>
       


                
            </div>

        </div>
    )
};

export default Documents;