import { db } from './firebase-config';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { GroceryItem } from './App';



// adds item to firebase
// basic try catch statements
// we add the item to database and catch errors
export const addGroceryItemToFirestore = async (item: { name: string; price: number }) => {
  
  try {
    const groceryItemsRef = collection(db, 'groceryItems');
    await addDoc(groceryItemsRef, item);
    console.log('Grocery item added to Firestore!');
  } 
  
  catch (error) {
    console.error('Error adding grocery item to Firestore:', error);
  }
};



// similar function
// adding cart to firebase to store from each user
// try catch statement
// cart associated with userid
// connect to database and store each item
export const addCartItemToFirestore = async (userId: string, itemId: string) => {
  
  try {
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', userId)));
    if (querySnapshot.empty) {
      await addDoc(cartRef, {
        userId,
        items: [itemId],
      });
    } 
    else {
      const cartDoc = querySnapshot.docs[0];
      const cartRefToUpdate = doc(db, 'carts', cartDoc.id);
      const currentItems = cartDoc.data().items || [];
      await updateDoc(cartRefToUpdate, {
        items: [...currentItems, itemId],
      });
    }
    console.log('Item added to cart!');
  } 
  catch (error) {
    console.error('Error adding item to cart:', error);
  }
};






// similar to previous function
// try catch
// connecting to firease
// removing item from cart
// associated user id will remove cart item from storage
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




// this function pulls from firebase
// connect to the firebase and we request the information
// try to connect to reference and pull items
// another try catch statement
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



// logging payment in the firebase
// this allows users to view previous items
// logging data, amount, items, and user
// try catch statement
// logges what happens to user
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
