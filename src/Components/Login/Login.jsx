import { useEffect, useState, createContext, useContext } from "react";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, getAuth } from "firebase/auth";
import { useAuth } from "../../Contexts/Auth";
import { useUtil } from "../../Contexts/Util";
import Email from './Email';
import Register from './Register';
import Reset from './Reset';
import { Routes, Route, Navigate } from 'react-router-dom';

const SignInValues = createContext();
export const useSignIn = () => useContext(SignInValues);

export const SignInContext = ({ children }) => {
    const { auth } = useAuth();
    const { spin, notify } = useUtil();
    const [transit, setTransit] = useState(localStorage.getItem('transit'));
    const [linkage, setLinkage] = useState(localStorage.getItem('linkage'));

    useEffect(() => {
        if (linkage) return localStorage.setItem('linkage', linkage);
        localStorage.removeItem('linkage');
    }, [linkage]);

    useEffect(() => {
        if (transit) return localStorage.setItem('transit', transit);
        localStorage.removeItem('transit');
    }, [transit]);

    useEffect(() => {
        // sets off loader due to a transit state
        if (transit && !auth) return spin(true);
        spin(false);
    }, [transit, auth]);

    const handleDuplicateError = (e) => {
        if (e.code === 'auth/account-exists-with-different-credential') {
            notify('This account already exists.');
        }
    };

    const values = { transit, setTransit, linkage, setLinkage, handleDuplicateError };
    return ( <SignInValues.Provider value={values}>{children}</SignInValues.Provider> );
};

const Login = () => {
    return (
        <SignInContext>
            <div className="grid justify-items-center items-center h-full w-full">
                <div className="grid h-[90%] w-[400px] my-10 p-6 gap-4 auto-rows-min justify-items-center border border-black rounded-xl shadow-xl overflow-auto">
                    <div className="grid gap-7 items-center justify-items-center">
                        <h1 className="text-6xl font-bold">idyle</h1>
                    </div>
                    <Routes>
                        <Route path="register" element={ <Register /> } /> 
                        <Route path="login" element={ <Email /> } /> 
                        <Route path="reset" element={ <Reset /> } /> 
                        <Route path="*" element={<Navigate to="login" />} /> 
                    </Routes>
                </div>
            </div>
        </SignInContext>
    )
};

export default Login;