import { Helmet } from "react-helmet";
import Control from "./Control";
import Staging from "./Staging";
import Labs from "./Labs";

const Deployer = () => {
    return (
        <div className="grid m-5">

            <Helmet>
                <title>idyle - Deployer</title>
            </Helmet>

            <div className="grid grid-cols-2 gap-3 overflow-auto">
                <Control />
                <div className="grid gap-3 grid-rows-[4fr_2fr] overflow-auto">
                    <Staging />
                    <Labs />
                </div>
            </div>

        </div>
    )
};

export default Deployer;