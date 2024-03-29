import { useContext, createContext } from "react";

const Props = createContext();
export const useProps = () => useContext(Props);

const Subnav = ({ children, mode = 'black', type = 'top' }) => {
    return (
        <Props.Provider value={{ mode }}>
            <div className={`grid rounded-lg w-full p-1 ${type === 'top' && 'justify-items-center'} ${mode === 'black' ? 'bg-gunmetal' : 'border border-gunmetal'}`}>
                <div className={`grid ${type === 'side' && 'p-3'} ${type === 'top' ? 'grid-flow-col' : 'grid-flow-col md:grid-flow-row md:auto-rows-min'} gap-3`}>
                    {children}
                </div>
            </div>
        </Props.Provider>
    )
};

export default Subnav;