// App.tsx
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
    setTotalAmount(prevAmount => prevAmount + 10); // Add a fixed price for now
  };

  const handleRemoveFromCart = (item: string) => {
    checkCurrentList(prevList => prevList.filter(i => i !== item));
    setTotalAmount(prevAmount => prevAmount - 10); // Subtract price when removing an item
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
                onNavigateToList={handleNavigateToList}
                onNavigateToCart={handleNavigateToCart}
                onNavigateToPayment={handleNavigateToPayment}
                onNavigateToPurchaseHistory={handleNavigateToPurchaseHistory}
                onNavigateToAccount={handleNavigateToAccount}
              />
            ) : currentView === 'groceryList' ? (
              <GroceryList
                groceryItems={groceryItems} // Pass the groceryItems prop
                onAddToCart={handleAddToCart} // Pass the onAddToCart prop
                onBackToDashboard={handleBackToDashboard} // Pass the onBackToDashboard prop
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












// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import { getDocs, collection } from 'firebase/firestore';
// import { auth, db } from './firebase-config';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';  // Import Firebase auth methods
// import Login from './Login.tsx';

// function App() {
//   // State management for authentication
//   const [isLoggedIn, checkIsLoggedIn] = useState(false);
//   const [groceryItems, setGroceryItems] = useState<any[]>([]); // State for holding grocery items from Firestore
//   const [userError, setUserError] = useState<string | null>(null); // Error message for login

//   // Refs for managing form input focus
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const [currentView, setCurrentView] = useState('dashboard'); // Track the current view

//   useEffect(() => {
//     // Check if a user is logged in
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         checkIsLoggedIn(true);
//         fetchGroceryItems(); // Fetch grocery items when user is logged in
//       } else {
//         checkIsLoggedIn(false);
//       }
//     });

//     return () => unsubscribe(); // Clean up the listener on unmount
//   }, []);

//   // Fetch grocery items from Firestore
//   const fetchGroceryItems = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'groceryItems'));
//       const itemsList: any[] = [];
//       querySnapshot.forEach((doc) => {
//         itemsList.push({ id: doc.id, ...doc.data() });
//       });
//       setGroceryItems(itemsList); // Set grocery items into the state
//     } catch (error) {
//       console.error("Error fetching grocery items: ", error);
//     }
//   };

//   // Handle user logout
//   const logout = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       checkIsLoggedIn(false); // Update login state
//       setCurrentView('dashboard');
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   // Handle login logic (using uncontrolled inputs)
//   const login = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setUserError(null); // Reset any previous errors
//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!username || !password) {
//       setUserError("Please enter both username and password.");
//       return;
//     }

//     try {
//       // Firebase login logic
//       const userCredential = await signInWithEmailAndPassword(auth, username, password);
//       console.log("User logged in:", userCredential.user);
//       checkIsLoggedIn(true);
//       setCurrentView('dashboard');
//     } catch (error: any) {
//       console.error("Error logging in:", error);
//       if (error.code === 'auth/user-not-found') {
//         setUserError('User not found. Please check your email or create an account.');
//       } else if (error.code === 'auth/wrong-password') {
//         setUserError('Incorrect password. Please try again.');
//       } else {
//         setUserError('Something went wrong. Please try again.');
//       }
//     }
//   };

//   // Dashboard view after user is logged in
//   const Dashboard = () => {
//     const listClick = () => {
//       console.log("list clicked");
//       setCurrentView('groceryList');
//     };

//     return (
//       <div className="dashboard">
//         <h2>Grocery List Dashboard</h2>
//         <button onClick={logout}>Logout</button>
//         <div className="dashboard-list" onClick={listClick}>
//           <h2>Create Grocery List</h2>
//         </div>
//       </div>
//     );
//   };

//   // Grocery List management view
//   const GroceryList = () => {
//     const [availableItems] = useState(["Apples", "Bananas", "Bread", "Milk", "Eggs"]);

//     const [currentList, checkCurrentList] = useState<string[]>([]);
//     const [availableMeals] = useState(["Burgers", "Chicken Tenders", "Lasagna", "Salad"]);
//     const [chosenMeals, checkMeals] = useState<string[]>([]);

//     const [Burgers] = useState(["Bread", "Lettuce", "Meat", "Tomato", "Onions"]);
//     const [Chicken_Tenders] = useState(["Chicken", "Fries", "Ketchup"]);
//     const [Lasagna] = useState(["Tomato", "Cheese", "Meat"]);
//     const [Salad] = useState(["Lettuce", "Tomato", "Dressing", "Cheese"]);

//     const addItem = (item: string) => {
//       checkCurrentList(prevList => [...prevList, item]);
//     };

//     const addMeal = (item: string) => {
//       checkMeals(prevList => {
//         if (prevList.includes(item)) {
//           return prevList.filter(meal => meal !== item);
//         } else {
//           return [...prevList, item];
//         }
//       });
//     };

//     const [favorite, checkFavorite] = useState<string[]>([]);
//     const addFavorite = (item: string) => {
//       checkFavorite(prevList => {
//         if (prevList.includes(item)) {
//           return prevList.filter(fav => fav !== item);
//         } else {
//           return [...prevList, item];
//         }
//       });
//     };

//     const [Review, checkReview] = useState('');
//     const Reviews = (value: string) => {
//       checkReview(value);
//     };

//     const addReview = (item: string) => {
//       console.log('Review added:', Review);
//       checkReview('');
//     };

//     return (
//       <div className='picks'>
//         <div className='available'>
//           <h2>Available picks!</h2>
//           <ul>
//             {availableItems.map((item, index) => (
//               <li key={index}>
//                 <button onClick={() => addFavorite(item)}>❤️</button>
//                 {item}
//                 <button onClick={() => addItem(item)}>Add</button>
//               </li>
//             ))}
//           </ul>
//         </div>
        
//         <div className='favorite'>
//           <h2>Favorites</h2>
//           <ul>
//             {favorite.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
        
//         <div className='current'>
//           <h2>Current picks</h2>
//           <ul>
//             {currentList.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>

//         <div className='mealoptions'>
//           <h2>Meal Plan Options</h2>
//           <ul>
//             {availableMeals.map((item, index) => (
//               <li key={index}>{item}<button onClick={() => addMeal(item)}>Choose</button></li>
//             ))}
//           </ul>
//         </div>

//         <div className='mealchosen'>
//           <h2>Meal Plans Chosen</h2>
//           <ul>
//             {chosenMeals.map((item, index) => (
//               <li key={index}>{item}<li>ingredients:</li>
//                 {item === "Burgers" ? Burgers.map((item, index) => (<li key={index}>{item}</li>)) :
//                 item === "Chicken Tenders" ? Chicken_Tenders.map((item, index) => (<li key={index}>{item}</li>)) :
//                 item === "Lasagna" ? Lasagna.map((item, index) => (<li key={index}>{item}</li>)) :
//                 item === "Salad" ? Salad.map((item, index) => (<li key={index}>{item}</li>)) : null}<p></p></li>
//             ))}
//           </ul>
//         </div>

//         <div className='userreview'>
//           <h2>User Reviews</h2>
//           <ul>
//             <input value={Review} onChange={(form) => Reviews(form.target.value)} />
//             <button onClick={() => addReview(Review)}>Add</button>
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   // Login view when user is not logged in
//   const Login = () => {
//     return (
//       <div className="login">
//         <h2>Login</h2>
//         <form onSubmit={login}>
//           <div>
//             <label>Username (Email)</label>
//             <input
//               type="email"
//               placeholder="Email"
//               ref={usernameRef} // Ref for username input (uncontrolled)
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Password"
//               ref={passwordRef} // Ref for password input (uncontrolled)
//             />
//           </div>
//           {userError && <div className="error-message">{userError}</div>}  {/* Display error message if any */}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {isLoggedIn ? (currentView === 'dashboard' ? <Dashboard /> : <GroceryList />) : <Login />}
//     </div>
//   );
// }

// export default App;





// import React, { useState, useEffect } from 'react';
// import { db } from './firebase-config'; // Ensure db is correctly initialized
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { auth } from './firebase-config';

// type MealKey = 'Burgers' | 'Chicken_Tenders' | 'Lasagna' | 'Salad';

// const GroceryList = () => {
//   const [availableItems, setAvailableItems] = useState<string[]>([]);
//   const [currentList, setCurrentList] = useState<string[]>([]);
//   const [favorite, setFavorite] = useState<string[]>([]);
//   const [chosenMeals, setChosenMeals] = useState<string[]>([]);
//   const [review, setReview] = useState<string>('');

//   const [meals, setMeals] = useState<Record<MealKey, string[]>>({
//     Burgers: ["Bread", "Lettuce", "Meat", "Tomato", "Onions"],
//     Chicken_Tenders: ["Chicken", "Fries", "Ketchup"],
//     Lasagna: ["Tomato", "Cheese", "Meat"],
//     Salad: ["Lettuce", "Tomato", "Dressing", "Cheese"]
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const docRef = doc(db, 'users', user.uid, 'groceryList', 'data');
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setAvailableItems(data.availableItems || []);
//           setCurrentList(data.currentList || []);
//           setFavorite(data.favorite || []);
//           setChosenMeals(data.chosenMeals || []);
//         } else {
//           console.log("No user data found!");
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Update Firebase with new data
//   const updateUserData = async (field: string, value: any) => {
//     const user = auth.currentUser;
//     if (user) {
//       const docRef = doc(db, 'users', user.uid, 'groceryList', 'data');
//       await updateDoc(docRef, {
//         [field]: value
//       });
//     }
//   };

//   const addItem = (item: string) => {
//     const updatedList = [...currentList, item];
//     setCurrentList(updatedList);
//     updateUserData('currentList', updatedList);
//   };

//   const addMeal = (meal: string) => {
//     const updatedMeals = chosenMeals.includes(meal) 
//       ? chosenMeals.filter(m => m !== meal) 
//       : [...chosenMeals, meal];
//     setChosenMeals(updatedMeals);
//     updateUserData('chosenMeals', updatedMeals);
//   };

//   const addFavorite = (item: string) => {
//     const updatedFavorites = favorite.includes(item)
//       ? favorite.filter(fav => fav !== item)
//       : [...favorite, item];
//     setFavorite(updatedFavorites);
//     updateUserData('favorite', updatedFavorites);
//   };

//   const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setReview(e.target.value);
//   };

//   const addReview = () => {
//     if (review.trim()) {
//       const updatedReviews = [...(currentList || []), review]; // Add review to current list for simplicity
//       setReview('');
//       updateUserData('reviews', updatedReviews); // Save review to Firebase
//     }
//   };

//   return (
//     <div className='picks'>
//       <div className='available'>
//         <h2>Available picks!</h2>
//         <ul>
//           {availableItems.map((item, index) => (
//             <li key={index}>
//               <button onClick={() => addFavorite(item)}>❤️</button>
//               {item}
//               <button onClick={() => addItem(item)}>Add</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className='favorite'>
//         <h2>Favorites</h2>
//         <ul>
//           {favorite.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       <div className='current'>
//         <h2>Current picks</h2>
//         <ul>
//           {currentList.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       <div className='mealoptions'>
//         <h2>Meal Plan Options</h2>
//         <ul>
//           {Object.keys(meals).map((mealKey) => {
//             const meal = mealKey as MealKey; // Cast to MealKey
//             return (
//               <li key={meal}>
//                 {meal}
//                 <button onClick={() => addMeal(meal)}>Choose</button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <div className='mealchosen'>
//         <h2>Meal Plans Chosen</h2>
//         <ul>
//           {chosenMeals.map((meal, index) => (
//             <li key={index}>
//               {meal}
//               <ul>
//                 {meals[meal as MealKey]?.map((ingredient, i) => (  // Cast `meal` to `MealKey`
//                   <li key={i}>{ingredient}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className='userreview'>
//         <h2>User Reviews</h2>
//         <input 
//           value={review} 
//           onChange={handleReviewChange} 
//           placeholder="Leave a review" 
//         />
//         <button onClick={addReview}>Add</button>
//       </div>
//     </div>
//   );
// };

// export default GroceryList;