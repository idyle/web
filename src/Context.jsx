import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const NavValues = createContext();
export const useNav = () => useContext(NavValues);

export const NavContext = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState(location.pathname);
    useEffect(() => {
        if (path) navigate(path);
    }, [navigate, path]);
    useEffect(() => {
        if (location.pathname) setPath(location.pathname);
    }, [location.pathname]);
    const values = { path, setPath };
    return ( <NavValues.Provider value={values}>{children}</NavValues.Provider> );
};

const UtilValues = createContext();
export const useUtil = () => useContext(UtilValues);

export const UtilContext = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [notifier, setNotifier] = useState();
    const values = { loader, setLoader, notifier, setNotifier };
    return ( <UtilValues.Provider value={values}>{children}</UtilValues.Provider> );
};

const AuthValues = createContext();
export const useAuth = () => useContext(AuthValues);

export const AuthContext = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('auth'));
    const [user, setUser] = useState();
    const { path, setPath } = useNav();
    const { loader, setLoader } = useUtil();
    useEffect(() => {
        console.log(auth, path);
        
        if (path === '/login' && auth === 'auth') {
            console.log('met', auth, path);
            setLoader(false);
            return setPath('/');
        }
        if (path !== '/login' && auth !== 'auth') {
            console.log('not auth and going not login!@');
            return setPath('/login');
        }
    }, [path, auth]);
    useEffect(() => onAuthStateChanged(getAuth(), user => {
        setUser(user);
        const auth = user?.uid ? 'auth' : false;
        setAuth(auth);
        localStorage.setItem('auth', auth);
    }), []);

    useEffect(() => console.log('is changed', auth), [auth]);
    const values = { auth, user }
    return ( <AuthValues.Provider value={values}>{children}</AuthValues.Provider> );
};
