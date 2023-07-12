import { useUtil } from "../Contexts/Util";
import { MdCheck } from 'react-icons/md';

const Informer = () => {

    const { informer, setInformer } = useUtil();

    const onConfirm = async () => {
        await informer?.resolve(true);
        setInformer({ ...informer, active: false });
    };

    return (
        <div className={`grid items-center justify-items-center ${informer?.active ? 'h-full' : 'h-0'} overflow-hidden fixed top-0 bottom-0 left-0 right-0 shadow bg-black/90`}>
            <div className="grid items-center justify-items-center bg-white text-gunmetal rounded-xl opacity-100 p-20 gap-3">
            <h1 className="text-4xl text-center font-bold select-none">{informer?.header}</h1>
            <h1 className="text-3xl text-center select-none">{informer?.message}</h1>
                <div className="grid items-center justify-items-center gap-3">
                    <div onClick={onConfirm} className="flex items-center gap-1 bg-gunmetal text-white rounded-lg p-2 hover:scale-[.98] select-none">
                        <MdCheck size="30px" />
                        <h1 className="text-3xl">Got it!</h1>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Informer;