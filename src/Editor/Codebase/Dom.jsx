import { useDom } from "./Codebase";

const Dom = () => {
    const { dom } = useDom();
    return (
        <div className="grid p-2 overflow-auto shadow-xl rounded-lg border border-black">
            {dom}
        </div>
    )
};

export default Dom;