import { useEffect, useState } from "react";
import { useUtil } from "../Contexts/Util";
import { MdCheck, MdCancel } from 'react-icons/md';

const Prompter = () => {

    const { prompter, setPrompter } = useUtil();
    const [value, setValue] = useState(prompter?.data || '');

    useEffect(() => setValue(prompter?.data || ''), [prompter?.data]);

    const onChange = (e) => {
        if (typeof e.target.value !== 'string') return;
        setValue(e.target.value);
    };

    const onConfirm = async () => {
        await prompter?.resolve(value);
        setValue('');
        setPrompter({ ...prompter, data: '', active: false });
    };
    const onCancel = () => {
        prompter?.resolve(false);
        setValue('');
        setPrompter({ ...prompter, active: false });
    };

    return (
        <div className={`grid items-center justify-items-center ${prompter?.active ? 'h-full' : 'h-0'} overflow-hidden fixed top-0 bottom-0 left-0 right-0 shadow bg-black/90`}>
            <div className="grid items-center justify-items-center bg-white text-gunmetal rounded-xl opacity-100 p-20 gap-3">
            <h1 className="text-4xl text-center font-bold select-none">{prompter?.message}</h1>
                <input type="text" value={value} onChange={onChange} className="outline-none text-4xl text-center bg-white border-b-2" />
                <div className="grid md:grid-cols-2 items-center justify-items-center gap-3">
                    <div onClick={onConfirm} className="flex items-center gap-1 bg-gunmetal text-white rounded-lg p-2 hover:scale-[.98] select-none">
                        <MdCheck size="30px" />
                        <h1 className="text-3xl">Okay</h1>
                    </div>
                    <div onClick={onCancel} className="flex items-center gap-1 border-2 border-gunmetal rounded-lg p-2 hover:scale-[.98] select-none">
                        <MdCancel size="30px" />
                        <h1 className="text-3xl">Cancel</h1>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Prompter;