import { initializeApp } from 'firebase/app';
import ga from 'react-ga4';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};

initializeApp(config);
ga.initialize(process.env.REACT_APP_MEASUREMENT_ID);