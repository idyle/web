import { useData } from "../../../Contexts/Data";
import { AiOutlineFile } from "react-icons/ai";
import { useUtil } from "../../../Contexts/Util";

const Objects = () => {
    const { notify } = useUtil();
    const { objects } = useData();

    const object = objects?.[0];

    const copy = () => {
        notify('Successfully copied to clipboard');
        navigator.clipboard.writeText(object?.url);
    };

    return (
        <div className="grid justify-items-center items-center gap-1 p-3">
            <AiOutlineFile size="40px" />
            <h1 className="text-3xl text-center font-bold">{object?.name}</h1>
            <h1 className="text-3xl">{object?.type}</h1>
            <div onClick={copy} className="flex rounded-lg border border-white p-1 select-none hover:scale-[.98]">
                <h1 className="text-3xl">Copy Link</h1>
            </div>
        </div>
    )
};

export default Objects;