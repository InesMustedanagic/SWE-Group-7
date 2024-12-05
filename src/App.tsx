import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import GroceryList from './GroceryList'; // Import GroceryList
import Cart from './Cart';
import Payment from './Payment';
import PurchaseHistory from './PurchaseHistory'; // Import PurchaseHistory
import Profile from './Profile'; // Import Profile

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

  const handleNavigateToList = () => {
    setCurrentView('groceryList');
  };

  const handleNavigateToCart = () => {
    setCurrentView('cart');
  };

  const handleNavigateToPayment = () => {
    setCurrentView('payment');
  };

  const handleNavigateToPurchaseHistory = () => {
    setCurrentView('purchaseHistory');
  };

  const handleNavigateToAccount = () => {
    setCurrentView('account');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleAddToCart = (item: string) => {
    checkCurrentList(prevList => [...prevList, item]);
    setTotalAmount(prevAmount => prevAmount + 10);
  };

  const handleRemoveFromCart = (item: string) => {
    checkCurrentList(prevList => prevList.filter(i => i !== item));
    setTotalAmount(prevAmount => prevAmount - 10);
  };

  const handleProceedToPayment = () => {
    setCurrentView('payment');
  };

  const handlePaymentSuccess = () => {
    checkCurrentList([]);
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
                onNavigateToList={handleNavigateToList}
                onNavigateToCart={handleNavigateToCart}
                onNavigateToPayment={handleNavigateToPayment}
                onNavigateToPurchaseHistory={handleNavigateToPurchaseHistory}
                onNavigateToAccount={handleNavigateToAccount}
              />
            ) : currentView === 'groceryList' ? (
              <GroceryList
                groceryItems={groceryItems}
                onAddToCart={handleAddToCart}
                onBackToDashboard={handleBackToDashboard}
              />
            ) : currentView === 'cart' ? (
              <Cart
                currentList={currentList}
                onRemoveItem={handleRemoveFromCart}
                onProceedToPayment={handleProceedToPayment}
              />
            ) : currentView === 'payment' ? (
              <Payment
                totalAmount={totalAmount}
                onPaymentSuccess={handlePaymentSuccess}
              />
            ) : currentView === 'purchaseHistory' ? (
              <PurchaseHistory onBackToDashboard={handleBackToDashboard} />
            ) : currentView === 'account' ? (
              <Profile onBackToDashboard={handleBackToDashboard} />
            ) : (
              <Dashboard
                onNavigateToList={handleNavigateToList}
                onNavigateToCart={() => {}}
                onNavigateToPayment={() => {}}
                onNavigateToPurchaseHistory={() => {}}
                onNavigateToAccount={() => {}}
              />
            )
          ) : (
            <Login />
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
