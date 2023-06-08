import { useEffect, useState } from 'react';
import { AiOutlinePartition, AiOutlineFile, AiOutlineLink, AiOutlineUpload } from 'react-icons/ai';
import { useAuth } from '../../../Contexts/Auth';
import { useUtil } from '../../../Contexts/Util';
import Object from './Object';
import { uploadFile } from './requests';
import { Helmet } from "react-helmet";
import { useData } from '../../../Contexts/Data';

const Objects = () => {

    const { user } = useAuth();
    const { load } = useUtil();
    const { objects, setObjects } = useData();
    console.log(objects, 'objects');
    const onChange = async (e) => {
        if (!e.target?.files[0]) return;

        const name = e.target?.files[0]?.name;
        const type = e.target?.files[0]?.type;

        load(true);
        console.log('UPLOADING FILE');
        const url = await uploadFile(user?.accessToken, e.target.files[0]);
        load(false);
        console.log(url, 'url')
        if (!url) return;

        setObjects([ ...objects, { name, type, ...url } ])

    };

    return (
        <div className="grid md:grid-rows-[auto_minmax(0,_1fr)_auto] m-5 gap-2">

            <Helmet>
                <title>idyle - Objects</title>
                <meta name="description" content="Objects" />
                <meta name="keywords" content="Objects" />
                <link rel="canonical" href="/objects" />
            </Helmet>

            <div className="hidden md:grid md:grid-cols-4 items-center justify-items-center border-2 border-black rounded-lg p-3">
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

            <div className="order-2 grid p-2 gap-3 auto-rows-min md:overflow-auto">
                { objects.map((object, i) => (<Object key={`o${i}`} object={object} objects={objects} setObjects={setObjects} />)) }
            </div>

            <div className="order-1 md:order-3 grid grid-flow-col items-center justify-items-center bg-black text-white p-3 gap-3 rounded-lg border-l-2 border-white">
                <h1 className="text-4xl justify-self-end">Objects</h1>
                <label className="grid grid-flow-col justify-self-start" htmlFor="file">
                    <AiOutlineUpload size="40px" />
                </label>
                <input type="file" className="hidden" onChange={onChange} id="file" />
            </div>
        </div>
    )
};

export default Objects;