import { createContext, useContext, useEffect, useState } from "react";

const UtilValues = createContext();
export const useUtil = () => useContext(UtilValues);

const UtilContext = ({ children }) => {
    const [spinning, spin] = useState(false);
    const [loading, load] = useState(false);
    const [notifier, setNotifier] = useState({ active: false });
    const notify = (message, time = 3000) => setNotifier({ message, active: true, time });
    const [informer, setInformer] = useState({ active: false });
    const inform = (header, message) => new Promise(resolve => setInformer({ resolve, header, message, active: true }));
    const [confirmer, setConfirmer] = useState({ active: false });
    const confirm = (message) => new Promise(resolve => setConfirmer({ resolve, message, active: true }));
    const [prompter, setPrompter] = useState({ active: false });
    const prompt = (data, message) => new Promise(resolve => setPrompter({ resolve, data, message, active: true }));
    const [integrator, setIntegrator] = useState({ active: false });
    const integrate = (origin) => new Promise(resolve => setIntegrator({ resolve, origin, active: true }) );
    const values = { 
        loading, load, spinning, spin,
        informer, inform, setInformer,
        notifier, notify, setNotifier, 
        confirmer, confirm, setConfirmer,
        prompter, prompt, setPrompter,
        integrator, integrate, setIntegrator 
    };
    return ( <UtilValues.Provider value={values}>{children}</UtilValues.Provider> );
};

export default UtilContext;