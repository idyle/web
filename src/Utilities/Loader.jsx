import { useUtil } from "../Contexts/Contexts";

const Loader = () => {

    const { loader } = useUtil();

    return (
        <div>
            { loader ? <div className="bg-black h-[5px] relative overflow-hidden ease-out duration-100"> {/* removed animate-bar */}
                <div className="bg-white w-full absolute left-0 top-0 bottom-0 transition-transform duration-200 linear animate-bar1"></div>
                <div className="bg-white w-full absolute left-0 top-0 bottom-0 transition-transform duration-200 linear animate-bar2"></div>
            </div> : <div className="h-[5px]"></div> }
        </div>

    )
};

export default Loader;