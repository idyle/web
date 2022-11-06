import { useState } from 'react';
import { useUtil } from '../Context';

const Notifier = ({ text = '' }) => {

    const { notifier } = useUtil();
    const [active, setActive] = useState(false);

    const timeout = () => {
        if (active) return;
        setActive(true);
        setTimeout(() => setActive(false), 3000);
    };

    return (
        <div>
            { notifier && <div className={`bg-black ${active ? 'h-[40px]' : 'h-0'} overflow-hidden absolute bottom-0 left-0 right-0 shadow ease-in duration-300`}>
                <h1 className="text-white">{text}</h1>
            </div> }
        </div>
    )
};

export default Notifier;