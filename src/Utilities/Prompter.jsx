import { useUtil } from "../Contexts/Util";
import { MdCheck, MdCancel } from 'react-icons/md';

const Prompter = () => {

    const { prompter, setPrompter } = useUtil();

    const onConfirm = async () => {
        await prompter?.resolve(true);
        setPrompter({ ...prompter, active: false });
    };
    const onCancel = () => {
        prompter?.resolve(false);
        setPrompter({ ...prompter, active: false });
    };
    // resolves true or false on pending promise

    return (
        <div className={`grid items-center justify-items-center ${prompter?.active ? 'h-full' : 'h-0'} overflow-hidden absolute top-0 bottom-0 left-0 right-0 shadow bg-black/90`}>
            <div className="grid items-center justify-items-center bg-white rounded-xl opacity-100 p-20 gap-3">
                <h1 className="text-4xl text-center font-bold select-none">{prompter?.message}</h1>
                <div className="grid md:grid-cols-2 items-center justify-items-center gap-3">
                    <div onClick={onConfirm} className="flex items-center gap-1 bg-black text-white rounded-lg p-2 hover:scale-[.98] select-none">
                        <MdCheck size="30px" />
                        <h1 className="text-3xl">Confirm</h1>
                    </div>
                    <div onClick={onCancel} className="flex items-center gap-1 border border-black rounded-lg p-2 hover:scale-[.98] select-none">
                        <MdCancel size="30px" />
                        <h1 className="text-3xl">Cancel</h1>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Prompter;