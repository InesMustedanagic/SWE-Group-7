import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import GroceryList from './GroceryList';
import Cart from './Cart';
import Payment from './Payment';
import PurchaseHistory from './PurchaseHistory';
import Profile from './Profile';
import { addCartItemToFirestore, removeCartItemFromFirestore, getCartItemsFromFirestore, storePaymentInFirestore } from './firebase-service';



// interface for our item storing firebase
export interface GroceryItem {
  id: string;
  name: string;
  price: number;
}



// main function to run our website
function App() {
  
  // react states to check views, items, user
  const [isLoggedIn, checkIsLoggedIn] = useState(false);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [currentList, setCurrentList] = useState<GroceryItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userError, setUserError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  // react state updating whenever user logs in and out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      
      if (user) {
        checkIsLoggedIn(true);
        fetchGroceryItems();
        loadUserCart(user.uid);} 
      
      
        else {
        checkIsLoggedIn(false);
      }});

    return () => unsubscribe();
  }, []);


  // gets grocery items from the firebase storage
  // works dynamically to allow for more inputs in the firebase
  // can fill with a lot of entries
  const fetchGroceryItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'groceryItems'));
      const itemsList: GroceryItem[] = [];
      
      querySnapshot.forEach(doc => {
        itemsList.push({ id: doc.id, ...doc.data() } as GroceryItem);
      });
      
      setGroceryItems(itemsList);

    } catch (error) {
      console.error('Error fetching grocery items:', error);
    }
  };



  // this loads each persons cart
  // gets item from the firebase
  // displays information
  const loadUserCart = async (userId: string) => {
    const items = await getCartItemsFromFirestore(userId);
    setCurrentList(items);
    const total = items.reduce((sum: number, item: GroceryItem) => sum + item.price, 0);
    setTotalAmount(total);
  };




  // adds item to your cart
  // based off user and puts to firebase
  const handleAddToCart = (item: GroceryItem) => {
    if (auth.currentUser) {
      
      addCartItemToFirestore(auth.currentUser.uid, item.id);
      setCurrentList(prevList => [...prevList, item]);
      setTotalAmount(prevAmount => prevAmount + item.price);
    }
  };
  

  // remove item from cart
  // based off user and firebase
  const handleRemoveFromCart = (item: GroceryItem) => {
    if (auth.currentUser) {
      
      removeCartItemFromFirestore(auth.currentUser.uid, item.id);
      setCurrentList(prevList => prevList.filter(i => i.id !== item.id));
      setTotalAmount(prevAmount => prevAmount - item.price);
    }
  };
  


  // stores payment in firebase
  // goes to payment page
  const handleProceedToPayment = () => {
    if (auth.currentUser) {
      
      storePaymentInFirestore(auth.currentUser.uid, totalAmount, currentList.map(item => item.id));
      setCurrentList([]);
      setTotalAmount(0);
  
      setCurrentView('payment');
    }
  };   



  // goes to payment history to show you the payment went through
  const handlePaymentSuccess = () => {
    console.log('Payment was successful!');
    setCurrentView('purchaseHistory');
  };



  // sign in page
  // matches the username and password
  // checks firebase credentials
  // sends you to the dashboard, or tells you its wrong
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      try {
        await signInWithEmailAndPassword(auth, usernameRef.current.value, passwordRef.current.value);
        setUserError(null);
        setCurrentView('dashboard');}
      
        catch (error) {
        setUserError('Invalid credentials.');}
    }
  };


  // signs user out
  // waits for logout to be pressed
  const handleSignOut = async () => {
    await signOut(auth);
  };



  // app requires us to return a statement
  // this runs for the entire app function for the website landing page
  return (
    
    
    // using router to allow user to take paths
    // lets user go ack and forth between pages
    <Router>
      <Routes>
        <Route
          path="/"
          
          
          // check if user logged in
          // depending on the view we navigate to that page/file
          element={isLoggedIn ? (
            currentView === 'dashboard' ? (
              <Dashboard
                onNavigateToList={() => setCurrentView('groceryList')}
                onNavigateToCart={() => setCurrentView('cart')}
                onNavigateToPayment={handleProceedToPayment}
                onNavigateToPurchaseHistory={() => setCurrentView('purchaseHistory')}
                onNavigateToAccount={() => setCurrentView('account')}
              />
            
            
            // all of these have different views and functions to make them work
            // links used to navigate to each page
            ) : currentView === 'groceryList' ? (
              <GroceryList
                groceryItems={groceryItems}
                onAddToCart={handleAddToCart}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            
            
            ) : currentView === 'cart' ? (
              <Cart
                currentList={currentList}
                onRemoveItem={handleRemoveFromCart}
                totalAmount={totalAmount}
                onProceedToPayment={handleProceedToPayment}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            
            
            ) : currentView === 'payment' ? (
              <Payment
                totalAmount={totalAmount}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setCurrentView('cart')}
              />
            
            
            ) : currentView === 'purchaseHistory' ? (
              <PurchaseHistory onBackToDashboard={() => setCurrentView('dashboard')} />
            
          
            ) : currentView === 'account' ? (
              <Profile onBackToDashboard={() => setCurrentView('dashboard')} />
            
            ) : null
          ) :
           
          
          (
            <Login
              onLogin={handleSignIn}
              userError={userError}
              usernameRef={usernameRef}
              passwordRef={passwordRef}
            />
          )}
          
          
          //route below for signup and login
          // was issues where the links did not work, but this fixes them
          // able to travel back and forth
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"
          element={
            <Login
              onLogin={handleSignIn}
              userError={userError}
              usernameRef={usernameRef}
              passwordRef={passwordRef}
            />
                      }
            />
        
      </Routes>
    </Router>
  );
}
export default App;

