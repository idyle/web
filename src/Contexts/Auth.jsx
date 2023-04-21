import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthValues = createContext();
export const useAuth = () => useContext(AuthValues);

export const AuthContext = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('auth'));
    const [user, setUser] = useState();
    const { loader, setLoader } = useUtil();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        const split = pathname.split('/')[1];
        
        if (split === 'login' && auth === 'auth') {
            navigate('/');
            return setLoader(false);
        }
        if ((split !== 'login' && split !== 'actions') && auth !== 'auth') {
            return navigate('/login');
        }
    }, [pathname, auth]);
    useEffect(() => {
        if (!auth && !user) return;
        if (auth && !user) {
            setLoader(true);
        }
        else if (auth && user) setLoader(false);
    }, [auth, user]);

    useEffect(() => onAuthStateChanged(getAuth(), async user => {
        const latest = await user?.getIdTokenResult(true);
        console.log('THE USER', latest?.claims);
        if (user && latest) setUser({ ...user, ...latest?.claims });
        // quick fix, combining base user details + latest info (from refresh)
        const auth = user?.uid ? 'auth' : '';
        setAuth(auth);
        localStorage.setItem('auth', auth);
    }), []);

    const values = { auth, user, setUser }
    return ( <AuthValues.Provider value={values}>{children}</AuthValues.Provider> );
};