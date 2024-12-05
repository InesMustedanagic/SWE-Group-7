
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { browserLocalPersistence, getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAaSUj1CSmoJKLoSthzty_PBLYaSFDsImE",
    authDomain: "grocery-website-48384.firebaseapp.com",
    projectId: "grocery-website-48384",
    storageBucket: "grocery-website-48384.firebasestorage.app",
    messagingSenderId: "721290980062",
    appId: "1:721290980062:web:01b86bcde9442ba288f04f",
    measurementId: "G-RMMCWEVXKQ"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);

export { db, auth };
