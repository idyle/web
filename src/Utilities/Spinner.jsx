import { useUtil } from "../Contexts/Util";
import { MdCheck, MdCancel } from 'react-icons/md';

const Spinner = () => {

    const { loading } = useUtil();

    return (
        <div className={`grid items-center justify-items-center ${loading ? 'h-full' : 'h-0'} overflow-hidden absolute top-0 bottom-0 left-0 right-0 shadow bg-black/10`}>
            
            <div className="w-[200px] h-[200px] border-4 border-t-4 border-t-black rounded-[50%] animate-spinner"></div>
        </div>
    )
};

export default Spinner;