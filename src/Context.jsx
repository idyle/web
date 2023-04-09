import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const UtilValues = createContext();
export const useUtil = () => useContext(UtilValues);

export const UtilContext = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [notifier, setNotifier] = useState({ active: false });
    const notify = (message, time = 3000) => setNotifier({ message, active: true, time });
    const [prompter, setPrompter] = useState({ active: false });
    const prompt = (message) => new Promise(resolve => setPrompter({ resolve, message, active: true }));
    const [integrator, setIntegrator] = useState({ active: false });
    const integrate = (origin) => new Promise(resolve => setIntegrator({ resolve, origin, active: true }) )
    const values = { 
        loader, setLoader, 
        notifier, notify, setNotifier, 
        prompter, prompt, setPrompter,
        integrator, integrate, setIntegrator 
    };
    return ( <UtilValues.Provider value={values}>{children}</UtilValues.Provider> );
};

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
