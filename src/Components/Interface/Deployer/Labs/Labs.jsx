import { IoMdFlask } from 'react-icons/io';
import Connect from './Connect';
import Convert from './Convert';

const Labs = ({ website }) => {

    return (
        <div className="grid p-3 gap-3 text-gunmetal bg-white rounded-lg">
            <div className="flex items-center gap-2 p-2 border-b-2 border-inherit">
                <IoMdFlask size="40px" />
                <h1 className="text-5xl md:text-6xl font-bold">Deploy Labs</h1>
            </div>
            <div className="grid items-center">
                <Connect website={website} />
            </div>
            <div className="grid items-center">
            <Convert />
            </div>

        </div>
    )
};

export default Labs;