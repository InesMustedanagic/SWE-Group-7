import { db } from './firebase-config';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

// Function to add a cart item to Firestore
export const addCartItemToFirestore = async (userId: string, item: string) => {
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));
    
    if (querySnapshot.empty) {
      // If the user doesn't have a cart yet, create a new cart
      await addDoc(cartRef, {
        userId,
        items: [item], // Initialize with the first item
      });
    } else {
      // If the user already has a cart, update the existing cart
      const cartDoc = querySnapshot.docs[0]; // Assuming only one cart per user
      const cartRefToUpdate = doc(db, 'carts', cartDoc.id);
      const currentItems = cartDoc.data().items || [];
      await updateDoc(cartRefToUpdate, {
        items: [...currentItems, item], // Add new item to the existing list
      });
    }

    console.log('Item added to cart!');
  } catch (error) {
    console.error('Error adding item to cart: ', error);
  }
};

// Function to remove a cart item from Firestore
export const removeCartItemFromFirestore = async (userId: string, item: string) => {
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));
    
    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0]; // Assuming only one cart per user
      const cartRefToUpdate = doc(db, 'carts', cartDoc.id);
      const currentItems = cartDoc.data().items || [];
      const updatedItems = currentItems.filter((cartItem: string) => cartItem !== item); // Remove item
      
      // Update the cart in Firestore
      await updateDoc(cartRefToUpdate, {
        items: updatedItems,
      });
    }

    console.log('Item removed from cart!');
  } catch (error) {
    console.error('Error removing item from cart: ', error);
  }
};

// Function to fetch cart items for a user
export const getCartItemsFromFirestore = async (userId: string) => {
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));
    
    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0]; // Assuming only one cart per user
      return cartDoc.data().items || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching cart items: ', error);
    return [];
  }
};
