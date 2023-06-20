import { IoMdFlask } from 'react-icons/io';
import Connect from './Connect';
import Convert from './Convert';

const Labs = ({ website }) => {

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] p-3 gap-2">
            <div className="flex items-center gap-2 p-2">
                <IoMdFlask size="40px" />
                <h1 className="text-5xl md:text-6xl font-bold">Deploy Labs</h1>
            </div>
            <div className="grid">
                <Convert />
                <Connect website={website} />
            </div> 
        </div>
    )
};

export default Labs;