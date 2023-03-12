import { useEffect, useState } from 'react';
import { useUtil } from '../Context';
import { HiOutlineInformationCircle } from 'react-icons/hi';

const Notifier = () => {

    const { notifier, setNotifier } = useUtil();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!notifier) return;
        setActive(true);
        timeout();
    }, [notifier])

    const timeout = () => {
        if (active) return;
        setTimeout(() => {
            setNotifier();
            setActive(false);
        }, 2000);
    };

    return (
        <div>
            <div className={`flex items-center place-content-center gap-1 bg-black ${active ? 'h-[40px]' : 'h-0'} overflow-hidden absolute bottom-0 left-0 right-0 shadow ease-in duration-300`}>
                <HiOutlineInformationCircle className="text-white" />
                <h1 className="text-lg text-white">{notifier}</h1>
            </div> 
        </div>
    )
};

export default Notifier;