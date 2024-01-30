import { createContext, useContext } from "react";
import { props } from 'types';

const APIValues = createContext({});
export const useAPI = () => useContext(APIValues);

const APIContext = ({ children }: props) => {

    const values = {};
    return (
        <APIValues.Provider value={values}>
            {children}
        </APIValues.Provider>
    );
};

export default APIContext;