import { initializeApp } from 'firebase/app';

const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
};

export default initializeApp(config);