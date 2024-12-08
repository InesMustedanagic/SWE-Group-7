// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { browserLocalPersistence, getAuth } from 'firebase/auth';

// Your Firebase config object from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAaSUj1CSmoJKLoSthzty_PBLYaSFDsImE",
    authDomain: "grocery-website-48384.firebaseapp.com",
    projectId: "grocery-website-48384",
    storageBucket: "grocery-website-48384.firebasestorage.app",
    messagingSenderId: "721290980062",
    appId: "1:721290980062:web:01b86bcde9442ba288f04f",
    measurementId: "G-RMMCWEVXKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);

const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);

// Function to add a grocery item to Firestore
const addGroceryItem = async (itemName: string, itemPrice: number) => {
    try {
      const docRef = await addDoc(collection(db, 'groceries'), {
        name: itemName,
        price: itemPrice,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

export { db, auth };