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
// import AddGroceryItem from './AddGroceryItem'; // Import AddGroceryItem component

import { addCartItemToFirestore, removeCartItemFromFirestore, getCartItemsFromFirestore } from './firebase-service'; // Import functions

function App() {
  const [isLoggedIn, checkIsLoggedIn] = useState(false);
  const [groceryItems, setGroceryItems] = useState<any[]>([]);
  const [currentList, checkCurrentList] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userError, setUserError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        checkIsLoggedIn(true);
        fetchGroceryItems();
        loadUserCart(user.uid); // Load cart items when logged in
      } else {
        checkIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchGroceryItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'groceryItems'));
      const itemsList: any[] = [];
      querySnapshot.forEach(doc => {
        itemsList.push({ id: doc.id, ...doc.data() });
      });
      setGroceryItems(itemsList);
    } catch (error) {
      console.error("Error fetching grocery items:", error);
    }
  };

  // Function to load the user's cart from Firestore
  const loadUserCart = async (userId: string) => {
    const items = await getCartItemsFromFirestore(userId);
    checkCurrentList(items);
    setTotalAmount(items.length * 10); // Assuming each item costs $10
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setUserError(null);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setUserError("Please enter both username and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      checkIsLoggedIn(true);
      setCurrentView('dashboard');
    } catch (error: any) {
      setUserError('Something went wrong. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      checkIsLoggedIn(false);
      setCurrentView('dashboard');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddToCart = async (item: string) => {
    if (auth.currentUser) {
      await addCartItemToFirestore(auth.currentUser.uid, item); // Add item to Firestore
      checkCurrentList(prevList => [...prevList, item]);
      setTotalAmount(prevAmount => prevAmount + 10); // Add a fixed price for now
    }
  };

  const handleRemoveFromCart = async (item: string) => {
    if (auth.currentUser) {
      await removeCartItemFromFirestore(auth.currentUser.uid, item); // Remove item from Firestore
      checkCurrentList(prevList => prevList.filter(i => i !== item));
      setTotalAmount(prevAmount => prevAmount - 10); // Subtract price when removing an item
    }
  };

  const handleProceedToPayment = () => {
    setCurrentView('payment');
  };

  const handlePaymentSuccess = () => {
    checkCurrentList([]); // Empty the cart after payment success
    setTotalAmount(0);
    setCurrentView('dashboard');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? (
            currentView === 'dashboard' ? (
              <Dashboard
                onNavigateToList={() => setCurrentView('groceryList')}
                onNavigateToCart={() => setCurrentView('cart')}
                onNavigateToPayment={handleProceedToPayment}
                onNavigateToPurchaseHistory={() => setCurrentView('purchaseHistory')}
                onNavigateToAccount={() => setCurrentView('account')}
              />
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
          ) : (
            <Login
              onLogin={login}
              userError={userError}
              usernameRef={usernameRef}
              passwordRef={passwordRef}
            />
          )}
        />
        {/* Add a route to add grocery item */}
        {/* <Route path="/add-grocery-item" element={<AddGroceryItem />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
