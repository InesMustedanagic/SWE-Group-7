
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { browserLocalPersistence, getAuth } from 'firebase/auth';


// database credentials
const firebaseConfig = {
    apiKey: "AIzaSyAaSUj1CSmoJKLoSthzty_PBLYaSFDsImE",
    authDomain: "grocery-website-48384.firebaseapp.com",
    projectId: "grocery-website-48384",
    storageBucket: "grocery-website-48384.firebasestorage.app",
    messagingSenderId: "721290980062",
    appId: "1:721290980062:web:01b86bcde9442ba288f04f",
    measurementId: "G-RMMCWEVXKQ"
};

// needed for firebase to function
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);


// i believe this function got scrapped but too late to run tests on if can be deleted
// originally made for adding a grocery item, decided to do another way
// originally supposed to collect grocery information, but this function has been voided
const addGroceryItem = async (itemName: string, itemPrice: number) => {
    try {
      const docRef = await addDoc(collection(db, 'groceries'), {
        name: itemName,
        price: itemPrice,
        createdAt: new Date(),
      });

      console.log(docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

export { db, auth };