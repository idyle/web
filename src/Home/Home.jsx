import Accounts from "./Accounts";
import Payments from './Payments';
import Documents from './Documents';
import Objects from './Objects';
import Metrics from './Metrics';
import Editor from './Editor';
import Deployer from './Deployer';
import Welcome from "./Welcome";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div className="grid grid-rows-9 grid-cols-9 gap-2 m-6">
            <Helmet>
                <title>idyle - Home</title>
                <meta name="description" content="Home" />
                <meta name="keywords" content="Home" />
                <link rel="canonical" href="/" />
            </Helmet>
            <div className="col-span-2 row-span-6 bg-black text-white rounded-lg p-1 overflow-hidden">
                <Editor />
            </div>

            <div className="col-span-4 row-span-1 bg-black text-white rounded-lg p-1">
                <Accounts />
            </div>

            <div className="grid col-span-3 row-span-3 bg-black text-white rounded-lg p-1 overflow-hidden">
                <Documents />
            </div>

            <div className="col-span-4 row-span-2 bg-black text-white rounded-lg p-1">
                <Payments />
            </div>

            <div className="col-span-5 row-span-3 p-1">
                <Welcome />
            </div>

            <div className="grid col-span-2 row-span-6 bg-black text-white rounded-lg p-1">
                <Deployer />
            </div>

            <div className="grid items-center justify-items-center col-span-4 row-span-3 bg-black text-white rounded-lg p-1">
                <Metrics />
            </div>

            <div className="col-span-3 row-span-3 bg-black text-white rounded-lg p-1">
                <Objects />
            </div>
        </div>
    )

};

export default Home;