import { useState } from "react";
import Elements from "./Elements/Elements.jsx";
import Options from "./Options.jsx";
import Formatter from "./Formatter/Formatter.jsx";

const Toolbar = () => {

    const [selected, setSelected] = useState('elements');

    return (
        <div className="grid m-1 gap-1 rounded-lg">
            <div className="grid grid-flow-col auto-cols-min gap-x-1 select-none bg-gunmetal text-white rounded-xl">
                <h1 onClick={() => setSelected('elements')} className={`text-2xl p-0.5 ${selected === 'elements' && 'bg-white text-gunmetal'} rounded-lg font-bold`}>Elements</h1>
                <h1 onClick={() => setSelected('format')} className={`text-2xl p-0.5 ${selected === 'format' && 'bg-white text-gunmetal'} rounded-lg font-bold`}>Format</h1>
                <h1 onClick={() => setSelected('options')} className={`text-2xl p-0.5 ${selected === 'options' && 'bg-white text-gunmetal'} rounded-lg font-bold`}>Options</h1>
            </div>

            { selected === "elements" ? <Elements /> : ( selected === "format" ? <Formatter /> : <Options />)}
        </div>
    )
};

export default Toolbar;