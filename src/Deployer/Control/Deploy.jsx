import { MdRadioButtonChecked } from "react-icons/md";
import { GrPowerReset } from 'react-icons/gr';

const Deploy = ({ i, deploy, website, revert }) => {

    const selected = deploy?.id === website?.deploy;
    const date = new Date(deploy?.timestamp).toDateString();

    const onRevert = () => revert(deploy?.id);

    return (
        <div className={`flex items-center ${selected ? 'bg-black text-white' : 'border border-black'} rounded-xl p-2 justify-between`}>
            <div className="grid p-2">
                <h1 className="text-4xl font-bold">Deploy #{i+1}</h1>
                <h1 className="text-3xl">Deploy ID: {deploy?.id}</h1>
                <h1 className="text-3xl">Created at: {date}</h1>
            </div>
            { selected ? <MdRadioButtonChecked size="40px" /> : <GrPowerReset onClick={onRevert} size="40px" /> }
        </div>
    )
};

export default Deploy;