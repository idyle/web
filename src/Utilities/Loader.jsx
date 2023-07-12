import { useUtil } from "../Contexts/Util";

const Loader = () => {

    const { loading } = useUtil();

    return (
        <div> 
            <div className={`bg-black ${loading ? 'h-[5px]' : 'h-0'} fixed top-0 left-0 right-0 overflow-hidden animate-bar`}>
                <div className="bg-white w-full absolute left-0 top-0 bottom-0 transition-transform duration-200 linear animate-mobilebar md:animate-bar1"></div>
                <div className="bg-white w-full absolute left-[-100%] md:left-0 top-0 bottom-0 transition-transform duration-200 delay-700 md:delay-0 linear animate-mobilebar md:animate-bar2"></div>
            </div> 
        </div>
    )
};

export default Loader;