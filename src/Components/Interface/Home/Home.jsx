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
        <div className="grid md:grid-rows-9 md:grid-cols-9 gap-1 m-3">
            <Helmet>
                <title>idyle - Home</title>
                <meta name="description" content="Home" />
                <meta name="keywords" content="Home" />
                <link rel="canonical" href="/" />
            </Helmet>

            <div className="grid md:col-span-2 md:row-span-6 bg-gunmetal text-white rounded-lg p-1 hidden md:block md:overflow-hidden">
                <Editor />
            </div>

            <div className="grid md:col-span-4 md:row-span-1 border border-gunmetal text-gunmetal rounded-lg p-1">
                <Accounts />
            </div>

            <div className="grid md:col-span-3 md:row-span-3 bg-gunmetal text-white rounded-lg p-1 hidden md:block md:overflow-hidden">
                <Documents />
            </div>

            <div className="md:col-span-4 md:row-span-2 bg-gunmetal text-white rounded-lg p-1">
                <Payments />
            </div>

            <div className="grid items-center justify-items-center md:col-span-5 text-gunmetal md:row-span-3 p-1">
                <Welcome />
            </div>

            <div className="grid md:col-span-2 md:row-span-6 border border-gunmetal text-gunmetal rounded-lg p-1">
                <Deployer />
            </div>

            <div className="grid items-center justify-items-center md:col-span-4 md:row-span-3 border border-gunmetal text-gunmetal rounded-lg p-1">
                <Metrics />
            </div>

            <div className="grid items-center justify-items-center md:col-span-3 md:row-span-3 bg-gunmetal text-white rounded-lg p-1">
                <Objects />
            </div>
        </div>
    )

};

export default Home;