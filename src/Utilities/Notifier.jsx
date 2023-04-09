import { useEffect, useState } from 'react';
import { useUtil } from '../Context';
import { HiOutlineInformationCircle } from 'react-icons/hi';

const Notifier = () => {

    const { notifier, setNotifier } = useUtil();

    // effect-based since it's just an advisory
    useEffect(() => {
        // activity is based on notifier
        if (!notifier?.active) return;
        setTimeout(() => setNotifier({ ...notifier, active: false }), notifier?.time);;
    }, [notifier?.active]);

    return (
        <div>
            <div className={`flex items-center place-content-center gap-1 bg-black ${notifier?.active ? 'h-[40px]' : 'h-0'} overflow-hidden absolute bottom-0 left-0 right-0 shadow ease-in duration-300`}>
                <HiOutlineInformationCircle className="text-white" />
                <h1 className="text-lg text-white">{notifier?.message}</h1>
            </div> 
        </div>
    )
};

export default Notifier;