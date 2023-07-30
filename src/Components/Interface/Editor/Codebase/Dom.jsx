import { useDom } from "./Codebase";

const Dom = () => {
    const { dom } = useDom();
    return (
        <div className="flex p-1 shadow-xl overflow-auto rounded-lg resize-none w-full max-w-full place-content-center">
            <div className={`flex w-full border-2 md:min-w-[240px] md:max-w-full border-gunmetal rounded-lg p-1 md:p-4 overflow-auto md:resize-x`}>
                {dom}
            </div>
        </div>
    )
};

export default Dom;