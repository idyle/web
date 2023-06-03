import { useUtil } from "../Contexts/Util";

const Loader = () => {

    const { loading } = useUtil();

    return (
        <div>
            { loading ? <div className="bg-black h-[5px] relative overflow-hidden animate-bar"> {/* removed animate-bar */}
                <div className="bg-white w-full absolute left-0 top-0 bottom-0 transition-transform duration-200 linear animate-mobilebar md:animate-bar1"></div>
                <div className="bg-white w-full absolute left-[-100%] md:left-0 top-0 bottom-0 transition-transform duration-200 delay-700 md:delay-0 linear animate-mobilebar md:animate-bar2"></div>
            </div> : <div className="h-[5px]"></div> }
        </div>

    )
};

export default Loader;