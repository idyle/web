import { useContext, createContext } from "react";

const Props = createContext();
export const useProps = () => useContext(Props);

const Subnav = ({ children, mode = 'black', type = 'top' }) => {
    return (
        <Props.Provider value={{ mode }}>
            <div className={`grid rounded-lg w-full p-1 ${type === 'top' && 'justify-items-center'} ${mode === 'black' ? 'bg-black' : 'bg-white border border-black shadow-xl'}`}>
                <div className={`grid ${type === 'side' && 'p-3'} ${type === 'top' ? 'grid-flow-col' : 'auto-rows-min'} gap-3`}>
                    {children}
                </div>
            </div>
        </Props.Provider>
    )
};

export default Subnav;