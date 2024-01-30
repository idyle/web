import { createContext, useContext } from "react";
import { props } from 'types';

const UtilsValues = createContext({});
export const useUtils = () => useContext(UtilsValues);

const UtilsContext = ({ children }: props) => {

    const values = {};
    return (
        <UtilsValues.Provider value={values}>
            {children}
        </UtilsValues.Provider>
    );
};

export default UtilsContext;