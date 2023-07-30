import { useEffect, useState } from "react";
import Elements from "./Elements/Elements.jsx";
import Options from "./Options.jsx";
import Formatter from "./Formatter/Formatter.jsx";
import { useSearchParams } from "react-router-dom";

const Toolbar = () => {

    const [queries, setQueries] = useSearchParams();
    const [selected, setSelected] = useState('elements');

    useEffect(() => {
        let mode = queries?.get('mode');
        if (mode !== 'canvas') return;
        let query = queries?.get('toolbar');
        if (query) return setSelected(query);
        setQueries({ mode: 'canvas', toolbar: 'elements' });
        setSelected('elements');
    }, [queries]);


    return (
        <div className="grid m-1 gap-1 rounded-lg">
            <div className="grid grid-flow-col auto-cols-min gap-x-1 select-none bg-gunmetal text-white rounded-xl">
                <h1 onClick={() => setQueries({ mode: 'canvas', toolbar: 'elements' })} className={`text-2xl p-0.5 ${selected === 'elements' && 'bg-white text-gunmetal'} rounded-lg font-bold`}>Elements</h1>
                <h1 onClick={() => setQueries({ mode: 'canvas', toolbar: 'formatter' })} className={`text-2xl p-0.5 ${selected === 'formatter' && 'bg-white text-gunmetal'} rounded-lg font-bold`}>Format</h1>
                <h1 onClick={() => setQueries({ mode: 'canvas', toolbar: 'options' })} className={`text-2xl p-0.5 ${selected === 'options' && 'bg-white text-gunmetal'} rounded-lg font-bold`}>Options</h1>
            </div>

            { selected === "elements" ? <Elements /> : ( selected === "formatter" ? <Formatter /> : <Options />)}
        </div>
    )
};

export default Toolbar;