import { Helmet } from "react-helmet";
import Viewer from "./Viewer";
import { AiOutlinePlus, AiOutlineRight } from 'react-icons/ai';
import Document from "./Document";

const Documents = () => {
    return (
        <div className='grid m-5'>

            <Helmet>
                <title>Documents</title>
            </Helmet>
            
            <div className="grid grid-cols-2 gap-3 overflow-hidden">
                <div className="grid px-3 auto-rows-min overflow-auto">
                    <div className="flex items-center justify-between bg-black rounded-lg text-white p-1 select-none">
                        <h1 className="text-3xl justify-self-start text-inherit">Documents</h1>
                        <AiOutlinePlus className="text-inherit" size="30px" />
                    </div>

                    <div className="grid p-3 gap-2 overflow-auto">
                        {
                            [...Array(30).keys()].map(() => (<Document />))
                        }


                    </div>
                </div>
                <Viewer />
            </div>

        </div>
    )
};

export default Documents;