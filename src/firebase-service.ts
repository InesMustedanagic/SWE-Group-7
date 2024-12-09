import { db } from './firebase-config';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { GroceryItem } from './App';


export const addGroceryItemToFirestore = async (item: { name: string; price: number }) => {
  try {
    const groceryItemsRef = collection(db, 'groceryItems');
    await addDoc(groceryItemsRef, item);
    console.log('Grocery item added to Firestore!');
  } catch (error) {
    console.error('Error adding grocery item to Firestore:', error);
  }
};


export const addCartItemToFirestore = async (userId: string, itemId: string) => {
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));

    if (querySnapshot.empty) {
      
      await addDoc(cartRef, {
        userId,
        items: [itemId],
      });
    } else {
      
      const cartDoc = querySnapshot.docs[0];
      const cartRefToUpdate = doc(db, 'carts', cartDoc.id);
      const currentItems = cartDoc.data().items || [];
      await updateDoc(cartRefToUpdate, {
        items: [...currentItems, itemId],
      });
    }

    console.log('Item added to cart!');
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};


export const removeCartItemFromFirestore = async (userId: string, itemId: string) => {
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));

    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0];
      const cartRefToUpdate = doc(db, 'carts', cartDoc.id);
      const currentItems = cartDoc.data().items || [];
      const updatedItems = currentItems.filter((cartItem: string) => cartItem !== itemId);

      
      await updateDoc(cartRefToUpdate, {
        items: updatedItems,
      });
    }

    console.log('Item removed from cart!');
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};



export const getCartItemsFromFirestore = async (userId: string) => {
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));

    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0];
      return cartDoc.data().items || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};


export const storePaymentInFirestore = async (userId: string, totalAmount: number, items: string[]) => {
  try {
    const paymentRef = collection(db, 'purchaseHistory');
    const docRef = await addDoc(paymentRef, {
      userId,
      items,
      total: totalAmount,
      date: new Date(),
    });
    console.log('Payment recorded in Firestore with ID: ', docRef.id);
  } catch (error) {
    console.error('Error recording payment in Firestore:', error);
  }
};
