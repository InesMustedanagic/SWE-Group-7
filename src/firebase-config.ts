// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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

export { db, auth };


// // src/firebase-service.ts
// import { db } from './firebase-config';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// // Function to add a review to Firestore
// export const addReviewToFirestore = async (review: string, userId: string) => {
//   try {
//     const reviewsCollection = collection(db, 'reviews');
//     await addDoc(reviewsCollection, {
//       review,
//       userId,
//       timestamp: new Date(),
//     });
//     console.log('Review added!');
//   } catch (error) {
//     console.error('Error adding review: ', error);
//   }
// };

// // Function to fetch reviews from Firestore
// export const getReviewsFromFirestore = async () => {
//   try {
//     const reviewsCollection = collection(db, 'reviews');
//     const reviewsSnapshot = await getDocs(reviewsCollection);
//     const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
//     return reviewsList;
//   } catch (error) {
//     console.error('Error fetching reviews: ', error);
//     return [];
//   }
// };


// // src/auth-service.ts
// import { auth } from './firebase-config';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// // Function to log in a user
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error('Login error: ', error);
//     throw error;
//   }
// };

// // Function to create a new user
// export const createUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error('Account creation error: ', error);
//     throw error;
//   }
// };
