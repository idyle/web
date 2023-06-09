import { useUtil } from "../Contexts/Util";

const Spinner = () => {

    const { spinning } = useUtil();

    return (
        <div className={`grid items-center justify-items-center ${spinning ? 'h-full' : 'h-0'} overflow-hidden fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>  
            <div className="w-[200px] h-[200px] border-4 border-t-4 border-t-white rounded-[50%] animate-spinner"></div>
        </div>
    )
};

export default Spinner;