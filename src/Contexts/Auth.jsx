import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthValues = createContext();
export const useAuth = () => useContext(AuthValues);

const AuthContext = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('idyle-auth'));
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const split = pathname.split('/')[1];
        if (split === 'login' && auth === 'auth') return navigate('/');
        if ((split !== 'login' && split !== 'actions') && auth !== 'auth') return navigate('/login');
    }, [pathname, auth]);

    useEffect(() => onAuthStateChanged(getAuth(), async user => {
        const latest = await user?.getIdTokenResult(true);
        if (latest) setUser({ ...latest, ...latest?.claims });
        const auth = user?.uid ? 'auth' : '';
        setAuth(auth);
        localStorage.setItem('idyle-auth', auth);
    }), []);

    const getToken = async () =>{
        const latest = await getAuth()?.currentUser?.getIdTokenResult(true);
        return latest?.token;
    };

    const resetUser = async () => {
        const latest = await getAuth()?.currentUser?.getIdTokenResult(true);
        if (!latest) return;
        setUser({ ...latest, ...latest?.claims });
    };

    const values = { auth, user, setUser, resetUser, getToken }
    return ( <AuthValues.Provider value={values}>{children}</AuthValues.Provider> );
};

export default AuthContext;