import { useEffect } from 'react';
import { AiOutlinePartition, AiOutlineFile, AiOutlineLink, AiOutlineUpload } from 'react-icons/ai';
import { useAuth } from '../Context';

import Object from './Object';
import { listFiles } from './requests';

const Objects = () => {


    const { user } = useAuth();
    useEffect(() => {
        if (!user?.accessToken);
        listFiles(user?.accessToken);
    }, [user?.accessToken])
    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)_auto] m-5 gap-2">

            <div className="grid grid-cols-4 items-center justify-items-center border-2 border-black rounded-lg p-3">
                <div className="flex items-center select-none gap-2">
                    <h1 className="text-2xl font-bold">Aa</h1>
                    <h1 className="text-3xl">File Name</h1>
                </div>
                <div className="flex items-center select-none gap-2">
                    <AiOutlineFile size="25px" />
                    <h1 className="text-3xl">File Type</h1>
                </div>
                <div className="flex items-center select-none gap-2">
                    <AiOutlineLink size="25px" />
                    <h1 className="text-3xl">File Link</h1>
                </div>
                <div className="flex items-center select-none gap-2">
                    <AiOutlinePartition size="25px" />
                    <h1 className="text-3xl">File Options</h1>
                </div>
            </div>


            <div className="grid p-2 gap-3 auto-rows-min overflow-auto">
                { [...Array(10).keys()].map(() => (<Object />)) }
            </div>

            <div className="grid grid-cols-2 items-center justify-items-center bg-black text-white p-3 gap-3 rounded-lg border-l-2 border-white">
                <h1 className="text-4xl justify-self-end">Objects</h1>
                <div className="grid grid-flow-col justify-self-start">
                    <AiOutlineUpload size="40px" />
                </div>
            </div>



        </div>
    )
};

export default Objects;