import { createContext, useContext } from "react";
import { props } from 'types';

const DataValues = createContext({});
export const useData = () => useContext(DataValues);

const DataContext = ({ children }: props) => {

    const values = {};
    return (
        <DataValues.Provider value={values}>
            {children}
        </DataValues.Provider>
    );
};

export default DataContext;