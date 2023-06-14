import { createContext, useContext, useState, useEffect } from 'react';
import { getAdditionalUserInfo, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUtil } from './Util';

const AuthValues = createContext();
export const useAuth = () => useContext(AuthValues);

const AuthContext = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('idyle-auth'));
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const split = pathname.split('/')[1];
        if (split === 'login' && auth === 'auth') return navigate('/');
        if ((split !== 'login' && split !== 'actions') && auth !== 'auth') return navigate('/login');
    }, [pathname, auth]);

    useEffect(() => onAuthStateChanged(getAuth(), async user => {
        setToken((await user?.getIdToken(true)));
        const latest = await user?.getIdTokenResult(true);
        if (user && latest) setUser({ ...user, ...latest?.claims });
        // quick fix, combining base user details + latest info (from refresh)
        const auth = user?.uid ? 'auth' : '';
        setAuth(auth);
        localStorage.setItem('idyle-auth', auth);
    }), []);

    const values = { auth, user, setUser, token }
    return ( <AuthValues.Provider value={values}>{children}</AuthValues.Provider> );
};

export default AuthContext;