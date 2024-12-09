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



export interface GroceryItem {
  id: string;
  name: string;
  price: number;
}

function App() {
  const [isLoggedIn, checkIsLoggedIn] = useState(false);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [currentList, setCurrentList] = useState<GroceryItem[]>([]);
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
        loadUserCart(user.uid);
      } else {
        checkIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const loadUserCart = async (userId: string) => {
    const items = await getCartItemsFromFirestore(userId);
    setCurrentList(items);
    const total = items.reduce((sum: number, item: GroceryItem) => sum + item.price, 0);
    setTotalAmount(total);
  };

  const handleAddToCart = (item: GroceryItem) => {
    if (auth.currentUser) {
      
      addCartItemToFirestore(auth.currentUser.uid, item.id);
      setCurrentList(prevList => [...prevList, item]);
      setTotalAmount(prevAmount => prevAmount + item.price);
    }
  };
  
  const handleRemoveFromCart = (item: GroceryItem) => {
    if (auth.currentUser) {
      
      removeCartItemFromFirestore(auth.currentUser.uid, item.id);
      setCurrentList(prevList => prevList.filter(i => i.id !== item.id));
      setTotalAmount(prevAmount => prevAmount - item.price);
    }
  };
  

  const handleProceedToPayment = () => {
    if (auth.currentUser) {
      
      storePaymentInFirestore(auth.currentUser.uid, totalAmount, currentList.map(item => item.id));
  
      
      setCurrentList([]);
      setTotalAmount(0);
  
      
      setCurrentView('payment');
    }
  };   

  const handlePaymentSuccess = () => {
    console.log('Payment was successful!');
    setCurrentView('purchaseHistory');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      try {
        await signInWithEmailAndPassword(auth, usernameRef.current.value, passwordRef.current.value);
        setUserError(null);
      } catch (error) {
        setUserError('Invalid credentials.');
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
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
              onLogin={handleSignIn}
              userError={userError}
              usernameRef={usernameRef}
              passwordRef={passwordRef}
            />
          )}
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
