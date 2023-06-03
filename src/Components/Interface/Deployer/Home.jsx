import { useData } from "../../../Contexts/Data";
import Control from "./Control/Control";
import Setup from "./Setup";
import Staging from "./Staging/Staging";

const Home = ({ deploy }) => {

    const { website, setWebsite} = useData();
    return (
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 overflow-hidden">
            <div className="grid grid-rows-[auto_minmax(0,_1fr)] md:gap-1 overflow-auto">
                <Setup website={website} setWebsite={setWebsite} />
                <Control website={website} deploy={deploy} />
            </div>    
            <Staging website={website} deploy={deploy} />
        </div>
    )
};

export default Home;