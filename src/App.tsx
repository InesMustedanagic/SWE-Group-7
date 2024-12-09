// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import { getDocs, collection } from 'firebase/firestore';
// import { auth, db } from './firebase-config';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import Login from './Login';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import GroceryList from './GroceryList';
// import GroceryItem from './GroceryList';
// import Cart from './Cart';
// import Payment from './Payment';
// import PurchaseHistory from './PurchaseHistory';
// import Profile from './Profile';

// import { addCartItemToFirestore, removeCartItemFromFirestore, getCartItemsFromFirestore } from './firebase-service'; // Import functions

// // Define the type for grocery items, including the 'id' field
// interface GroceryItem {
//   id: string;  // Add the 'id' field here
//   name: string;
//   price: number;
// }

// function App() {
//   const [isLoggedIn, checkIsLoggedIn] = useState(false);
//   const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);  // Use the new GroceryItem type
//   const [currentList, checkCurrentList] = useState<GroceryItem[]>([]);  // Use the new GroceryItem type
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [userError, setUserError] = useState<string | null>(null);
//   const [currentView, setCurrentView] = useState('dashboard');
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         checkIsLoggedIn(true);
//         fetchGroceryItems();
//         loadUserCart(user.uid); // Load cart items when logged in
//       } else {
//         checkIsLoggedIn(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchGroceryItems = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'groceryItems'));
//       const itemsList: GroceryItem[] = [];  // Use the updated type for the list
//       querySnapshot.forEach(doc => {
//         itemsList.push({ id: doc.id, ...doc.data() } as GroceryItem);  // Cast to GroceryItem
//       });
//       setGroceryItems(itemsList);
//     } catch (error) {
//       console.error("Error fetching grocery items:", error);
//     }
//   };

//   const loadUserCart = async (userId: string) => {
//     const items = await getCartItemsFromFirestore(userId);
//     checkCurrentList(items);
//     setTotalAmount(items.reduce((acc: number, item: { price: number }) => acc + item.price, 0)); // Calculate total based on prices
//   };

//   const login = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setUserError(null);
//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!username || !password) {
//       setUserError("Please enter both username and password.");
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, username, password);
//       checkIsLoggedIn(true);
//       setCurrentView('dashboard');
//     } catch (error: any) {
//       setUserError('Something went wrong. Please try again.');
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       checkIsLoggedIn(false);
//       setCurrentView('dashboard');
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   // Function to add item to cart - use item.name if that's what addCartItemToFirestore expects
//   const handleAddToCart = async (item: GroceryItem) => {
//     if (auth.currentUser) {
//       await addCartItemToFirestore(auth.currentUser.uid, item.name); // Pass only name (or id)
//       checkCurrentList(prevList => [...prevList, item]); // Add the entire item to the state
//       setTotalAmount(prevAmount => prevAmount + item.price); // Update the total amount based on the item price
//     }
//   };
  

//   // Function to remove item from cart - update to pass only `name`
//   const handleRemoveFromCart = async (item: { name: string; price: number }) => {
//     if (auth.currentUser) {
//       // Find the grocery item with `id` to remove
//       const groceryItem = groceryItems.find(grocery => grocery.name === item.name);
//       if (groceryItem) {
//         await removeCartItemFromFirestore(auth.currentUser.uid, groceryItem.name); // Remove item from Firestore
  
//         // Remove item from the current list based on name
//         checkCurrentList(prevList => prevList.filter(i => i.id !== groceryItem.id));
  
//         // Subtract price from totalAmount
//         setTotalAmount(prevAmount => prevAmount - groceryItem.price);
//       }
//     }
//   };
  

//   const handleProceedToPayment = () => {
//     setCurrentView('payment');
//   };

//   const handlePaymentSuccess = () => {
//     checkCurrentList([]); // Empty the cart after payment success
//     setTotalAmount(0);
//     setCurrentView('dashboard');
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={isLoggedIn ? (
//             currentView === 'dashboard' ? (
//               <Dashboard
//                 onNavigateToList={() => setCurrentView('groceryList')}
//                 onNavigateToCart={() => setCurrentView('cart')}
//                 onNavigateToPayment={handleProceedToPayment}
//                 onNavigateToPurchaseHistory={() => setCurrentView('purchaseHistory')}
//                 onNavigateToAccount={() => setCurrentView('account')}
//               />
//             ) : currentView === 'groceryList' ? (
//               <GroceryList
//                 groceryItems={groceryItems}
//                 onAddToCart={handleAddToCart}
//                 onBackToDashboard={() => setCurrentView('dashboard')}
//               />
//             ) : currentView === 'cart' ? (
//               <Cart
//                 currentList={currentList}
//                 onRemoveItem={handleRemoveFromCart}
//                 totalAmount={totalAmount}
//                 onProceedToPayment={handleProceedToPayment}
//                 onBackToDashboard={() => setCurrentView('dashboard')}
//               />
//             ) : currentView === 'payment' ? (
//               <Payment
//                 totalAmount={totalAmount}
//                 onSuccess={handlePaymentSuccess}
//                 onCancel={() => setCurrentView('cart')}
//               />
//             ) : currentView === 'purchaseHistory' ? (
//               <PurchaseHistory onBackToDashboard={() => setCurrentView('dashboard')} />
//             ) : currentView === 'account' ? (
//               <Profile onBackToDashboard={() => setCurrentView('dashboard')} />
//             ) : null
//           ) : (
//             <Login
//               onLogin={login}
//               userError={userError}
//               usernameRef={usernameRef}
//               passwordRef={passwordRef}
//             />
//           )}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import { getDocs, collection } from 'firebase/firestore';
// import { auth, db } from './firebase-config';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import Login from './Login';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import GroceryList from './GroceryList';
// import GroceryItem from './GroceryList';
// import Cart from './Cart';
// import Payment from './Payment';
// import PurchaseHistory from './PurchaseHistory';
// import Profile from './Profile';
// import { addCartItemToFirestore, removeCartItemFromFirestore, getCartItemsFromFirestore, storePaymentInFirestore } from './firebase-service';

// export interface GroceryItem {
//   id: string;
//   name: string;
//   price: number;
// }

// function App() {
//   const [isLoggedIn, checkIsLoggedIn] = useState(false);
//   const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
//   const [currentList, setCurrentList] = useState<GroceryItem[]>([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [userError, setUserError] = useState<string | null>(null);
//   const [currentView, setCurrentView] = useState('dashboard');
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         checkIsLoggedIn(true);
//         fetchGroceryItems();
//         loadUserCart(user.uid);
//       } else {
//         checkIsLoggedIn(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchGroceryItems = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'groceryItems'));
//       const itemsList: GroceryItem[] = [];
//       querySnapshot.forEach(doc => {
//         itemsList.push({ id: doc.id, ...doc.data() } as GroceryItem);
//       });
//       setGroceryItems(itemsList);
//     } catch (error) {
//       console.error('Error fetching grocery items:', error);
//     }
//   };

//   const loadUserCart = async (userId: string) => {
//     const items = await getCartItemsFromFirestore(userId);
//     setCurrentList(items);
//     const total = items.reduce((sum: number, item: GroceryItem) => sum + item.price, 0); // Ensure sum and item are typed correctly
//     setTotalAmount(total);
//   };

//   const handleAddToCart = (item: GroceryItem) => {
//     if (auth.currentUser) {
//       // Pass the correct parameters: userId and item.id (string)
//       addCartItemToFirestore(auth.currentUser.uid, item);
//       setCurrentList(prevList => [...prevList, item]);
//       setTotalAmount(prevAmount => prevAmount + item.price);
//     }
//   };

//   const handleRemoveFromCart = (item: GroceryItem) => {
//     if (auth.currentUser) {
//       // Pass the correct parameters: userId and item.id (string)
//       removeCartItemFromFirestore(auth.currentUser.uid, item);
//       setCurrentList(prevList => prevList.filter(i => i.id !== item.id));
//       setTotalAmount(prevAmount => prevAmount - item.price);
//     }
//   };

//   const handleProceedToPayment = () => {
//     if (auth.currentUser) {
//       storePaymentInFirestore(auth.currentUser.uid, totalAmount, currentList.map(item => item.id));
//       setCurrentView('payment');
//     }
//   };

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (usernameRef.current && passwordRef.current) {
//       try {
//         await signInWithEmailAndPassword(auth, usernameRef.current.value, passwordRef.current.value);
//         setUserError(null);
//       } catch (error) {
//         setUserError('Invalid credentials.');
//       }
//     }
//   };

//   const handleSignOut = async () => {
//     await signOut(auth);
//   };
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={isLoggedIn ? (
//             currentView === 'dashboard' ? (
//               <Dashboard
//                 onNavigateToList={() => setCurrentView('groceryList')}
//                 onNavigateToCart={() => setCurrentView('cart')}
//                 onNavigateToPayment={handleProceedToPayment}
//                 onNavigateToPurchaseHistory={() => setCurrentView('purchaseHistory')}
//                 onNavigateToAccount={() => setCurrentView('account')}
//               />
//             ) : currentView === 'groceryList' ? (
//               <GroceryList
//                 groceryItems={groceryItems}
//                 onAddToCart={handleAddToCart}
//                 onBackToDashboard={() => setCurrentView('dashboard')}
//               />
//             ) : currentView === 'cart' ? (
//               <Cart
//                 currentList={currentList}
//                 onRemoveItem={handleRemoveFromCart}
//                 totalAmount={totalAmount}
//                 onProceedToPayment={handleProceedToPayment}
//                 onBackToDashboard={() => setCurrentView('dashboard')}
//               />
//             ) : currentView === 'payment' ? (
//               <Payment
//                 totalAmount={totalAmount}
//                 onSuccess={handlePaymentSuccess}
//                 onCancel={() => setCurrentView('cart')}
//               />
//             ) : currentView === 'purchaseHistory' ? (
//               <PurchaseHistory onBackToDashboard={() => setCurrentView('dashboard')} />
//             ) : currentView === 'account' ? (
//               <Profile onBackToDashboard={() => setCurrentView('dashboard')} />
//             ) : null
//           ) : (
//             <Login
//               onLogin={login}
//               userError={userError}
//               usernameRef={usernameRef}
//               passwordRef={passwordRef}
//             />
//           )}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// //   return (
// //     <Router>
// //       <div className="app-container">
// //         {isLoggedIn ? (
// //           <div>
// //             <Routes>
// //               <Route
// //                 path="/grocery-list"
// //                 element={
// //                   <GroceryList
// //                     groceryItems={groceryItems}
// //                     onAddToCart={handleAddToCart}
// //                     onBackToDashboard={() => setCurrentView('dashboard')}
// //                   />
// //                 }
// //               />
// //               <Route
// //                 path="/cart"
// //                 element={
// //                   <Cart
// //                     currentList={currentList}
// //                     onRemoveFromCart={handleRemoveFromCart} 
// //                     onProceedToPayment={handleProceedToPayment}
// //                     totalAmount={totalAmount}
// //                   />
// //                 }
// //               />
// //               <Route
// //                 path="/payment"
// //                 element={<Payment totalAmount={totalAmount} onSuccess={() => alert('Payment Successful')} onCancel={() => alert('Payment Cancelled')} />}
// //               />
// //             </Routes>
// //           </div>
// //         ) : (
// //           <div className="login-form">
// //             <form onSubmit={handleSignIn}>
// //               <input type="email" placeholder="Email" ref={usernameRef} />
// //               <input type="password" placeholder="Password" ref={passwordRef} />
// //               {userError && <p className="error">{userError}</p>}
// //               <button type="submit">Log In</button>
// //             </form>
// //           </div>
// //         )}
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;







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

// Define GroceryItem interface
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
    const total = items.reduce((sum: number, item: GroceryItem) => sum + item.price, 0); // Ensure sum and item are typed correctly
    setTotalAmount(total);
  };

  const handleAddToCart = (item: GroceryItem) => {
    if (auth.currentUser) {
      // Add the item to Firestore by passing only the id (which is a string)
      addCartItemToFirestore(auth.currentUser.uid, item.id);
      setCurrentList(prevList => [...prevList, item]);
      setTotalAmount(prevAmount => prevAmount + item.price);
    }
  };
  
  const handleRemoveFromCart = (item: GroceryItem) => {
    if (auth.currentUser) {
      // Remove the item from Firestore by passing only the id (which is a string)
      removeCartItemFromFirestore(auth.currentUser.uid, item.id);
      setCurrentList(prevList => prevList.filter(i => i.id !== item.id));
      setTotalAmount(prevAmount => prevAmount - item.price);
    }
  };
  

  const handleProceedToPayment = () => {
    if (auth.currentUser) {
      // Store the payment in Firestore
      storePaymentInFirestore(auth.currentUser.uid, totalAmount, currentList.map(item => item.id));
  
      // Clear the cart after payment is successful
      setCurrentList([]); // Empty the cart
      setTotalAmount(0); // Reset total amount to 0
  
      // Navigate to payment view
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
      </Routes>
    </Router>
  );
}

export default App;
