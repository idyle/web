import { createContext, useContext } from "react";
import { props } from 'types';

const AuthValues = createContext({});
export const useAuth = () => useContext(AuthValues);

const AuthContext = ({ children }: props) => {

    const values = {};
    return (
        <AuthValues.Provider value={values}>
            {children}
        </AuthValues.Provider>
    );
};

export default AuthContext;