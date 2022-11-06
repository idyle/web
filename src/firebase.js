import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const config = {
    apiKey: "AIzaSyAkuxJPVjUa6zk1zjiBI6i8XwaVC91IDvQ",
    authDomain: "idyleio.firebaseapp.com",
    projectId: "idyleio",
    storageBucket: "idyleio.appspot.com",
    messagingSenderId: "131994800774",
    appId: "1:131994800774:web:a0870930612f777636f707"
};
const app = initializeApp(config);
export const auth = getAuth(app);