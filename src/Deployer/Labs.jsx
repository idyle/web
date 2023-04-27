import { IoMdFlask } from 'react-icons/io';
import { MdPages, MdClose } from 'react-icons/md';
import { HiOutlineDatabase } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import { useUtil } from "../Contexts/Util";
import { useAuth } from "../Contexts/Auth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { convertPage } from './requests';

const Labs = () => {

    const navigate = useNavigate();
    const { setIntegrator, notify, prompt, integrator, setLoader } = useUtil();
    const { user } = useAuth();

    const [page, setPage] = useState({});

    const remove = async () => {
        if (!(await prompt('Remove your chosen page?'))) return;
        setPage({});
        notify('Removed the page');
    };

    // sendPageRequest
    const sendPageRequest = async () => {
        console.log('CLICKED')
        setIntegrator({ active: true, target: 'editor/pages' });
        notify('Sending you to editor/pages. Please select a page to convert.');
        navigate('/editor/pages');
    };

    // returning
    useEffect(() => {
        console.log('INTEGREATOR IS BACK', integrator);
        if (!integrator?.active || integrator?.target !== 'editor/pages' || !integrator?.data) return;
        // directly a page
        console.log('DATA RECEIED', integrator?.data);
        setPage(integrator?.data);
        setIntegrator({ active: false });
    }, [integrator?.active]);

    const onConvert = async () => {
        if (!page?.route) return;
        setLoader(true);
        const operation = await convertPage(user?.accessToken, page?.route);
        setLoader(false);
        if (!operation) return notify('Something went wrong converting the page.');
        notify('Successfully converted the page. Sending you to objects.');
        navigate('/objects');
    }

    return (
        <div className="grid auto-rows-min border border-black rounded-lg p-3 gap-2">
            <div className="flex items-center gap-2 p-2">
                <IoMdFlask size="40px" />
                <h1 className="text-5xl">Deploy Labs</h1>
            </div>

            <div onClick={sendPageRequest} className="flex flex-wrap items-center gap-2 place-content-center border border-black rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl text-center">Select Page Data from Pages</h1>
            </div>

            {/* <div className="flex items-center gap-2 place-content-center border border-black rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl text-center">Select Custom Data from</h1>
                <div className="flex items-center gap-1">
                <HiOutlineDatabase size="30px" />
                <h1 className="text-4xl text-center">Docs</h1>
                </div>
            </div> */}

            {/* TO BE RELEASED IN THE FUTURE */}

            { page?.route && <div className="flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center p-1 gap-1">
                    <BsThreeDots size="25px" />
                    <h1 className="text-3xl">/{page?.route}</h1>
                </div>
                <MdClose onClick={remove} size="25px" />
            </div> }

            <div onClick={onConvert} className="grid items-center justify-items-center bg-black text-white p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-4xl font-bold">Convert Data</h1>
            </div>
        </div>
    )
};

export default Labs;