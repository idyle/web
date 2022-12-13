import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import Div from "../Elements/Div";
import Text from "../Elements/Text";

const DomValues = createContext();
export const useDom = () => useContext(DomValues);

export const DomContext = ({ children }) => {
    const [selected, setSelected] = useState('');
    const values = { selected, setSelected };
    return ( <DomValues.Provider value={values}>{children}</DomValues.Provider> );
};


const Canvas = () => {

    const [JSON, setJSON] = useState({});
    // carrier object, manipulate from click is placed here

    useEffect(() => {
        // render HTML based on edited JSON data
        // 
    }, [JSON])
    const [dom, setDom] = useState([]);

    const testfunction = () => {
        // add element into dom

        // we must base our addition on the current selected state
        setDom([ ...dom, <Div id={`e${dom.length}`} />])
    }

    const testfunction2 = () => {
        setDom([ ...dom, <Text id={`e${dom.length}`} />])
    }


    return (
        <div className="grid grid-cols-[20%_80%] m-2">
            <div className="grid border border-black p-2 shadow-xl rounded-lg m-1">
                <h1 className="text-xl" onClick={testfunction}>hi</h1>
                <h1 className="text-xl" onClick={testfunction2}>Try text</h1>
            </div> 

            <div className="block p-2 overflow-auto shadow-xl rounded-lg m-1">
                <DomContext>
                {dom}
                </DomContext>
            </div>
        </div>
    )
};

export default Canvas;