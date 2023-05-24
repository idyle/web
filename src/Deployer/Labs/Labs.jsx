import { IoMdFlask } from 'react-icons/io';
import Connect from './Connect';
import Convert from './Convert';

const Labs = () => {

    return (
        <div className="grid auto-rows-min border border-black rounded-lg p-3 gap-2">
            <div className="flex items-center gap-2 p-2">
                <IoMdFlask size="40px" />
                <h1 className="text-6xl">Deploy Labs</h1>
            </div>

            <Convert />
            <Connect />
        </div>
    )
};

export default Labs;