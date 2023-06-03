import { createContext, useContext, useState } from "react";

const UtilValues = createContext();
export const useUtil = () => useContext(UtilValues);

const UtilContext = ({ children }) => {
    const [loading, load] = useState(false);
    const [notifier, setNotifier] = useState({ active: false });
    const notify = (message, time = 3000) => setNotifier({ message, active: true, time });
    const [prompter, setPrompter] = useState({ active: false });
    const prompt = (message) => new Promise(resolve => setPrompter({ resolve, message, active: true }));
    const [integrator, setIntegrator] = useState({ active: false });
    const integrate = (origin) => new Promise(resolve => setIntegrator({ resolve, origin, active: true }) )
    const values = { 
        loading, load, 
        notifier, notify, setNotifier, 
        prompter, prompt, setPrompter,
        integrator, integrate, setIntegrator 
    };
    return ( <UtilValues.Provider value={values}>{children}</UtilValues.Provider> );
};

export default UtilContext;