import { MdRadioButtonChecked } from "react-icons/md";
import { GrPowerReset } from 'react-icons/gr';

const Deploy = () => {

    const selected = true;

    return (
        <div className={`flex items-center ${selected ? 'bg-black text-white' : 'border border-black'} rounded-xl p-2 justify-between`}>
            <div className="grid p-2">
                <h1 className="text-4xl font-bold">Deploy #1</h1>
                <h1 className="text-3xl">Deploy ID: ewoiq042194</h1>
                <h1 className="text-3xl">Last updated at: 24 January 2022</h1>
            </div>
            { selected ? <MdRadioButtonChecked size="40px" /> : <GrPowerReset size="40px" /> }
        </div>
    )
};

export default Deploy;