import React, { useState } from 'react';
import './App.css';

function App() {
  function GroceryList() {
    const [availableItems] = useState(["Apples", "Bananas", "Bread", "Milk", "Eggs", "Tomato"]);
    const [currentList, checkCurrentList] = useState<{ item: string; quantity: number }[]>([]);
    const [availableMeals] = useState(["Burgers", "Chicken Tenders", "Lasagna", "Salad"]);

    const [Burgers] = useState(["Bread", "Lettuce", "Meat", "Tomato", "Onions"]);
    const [Chicken_Tenders] = useState(["Chicken", "Fries", "Ketchup"]);
    const [Lasagna] = useState(["Tomato", "Cheese", "Meat"]);
    const [Salad] = useState(["Lettuce", "Tomato", "Dressing", "Cheese"]);

    const addItem = (item: string) => {
      checkCurrentList((prevList) => {
        const existingItem = prevList.find((listItem) => listItem.item === item);
        if (existingItem) {
          // If the item exists, increment quantity by 1
          return prevList.map((listItem) =>
            listItem.item === item
              ? { ...listItem, quantity: listItem.quantity + 1 }
              : listItem
          );
        } else {
          // If it doesn't exist, add it with quantity 1
          return [...prevList, { item, quantity: 1 }];
        }
      });
    };

    const addMeal = (meal: string) => {
      const mealIngredients = getIngredients(meal);
      mealIngredients.forEach((ingredient) => addItem(ingredient));
    };

    const getIngredients = (meal: string) => {
      switch (meal) {
        case "Burgers":
          return Burgers;
        case "Chicken Tenders":
          return Chicken_Tenders;
        case "Lasagna":
          return Lasagna;
        case "Salad":
          return Salad;
        default:
          return [];
      }
    };

    const removeItem = (item: string) => {
      checkCurrentList((prevList) =>
        prevList
          .map((listItem) =>
            listItem.item === item
              ? { ...listItem, quantity: listItem.quantity - 1 }
              : listItem
          )
          .filter((listItem) => listItem.quantity > 0)
      );
    };

    return (
      <div className="groceryList">
        {/* Available Picks */}
        <div className="available">
          <h2>Available Picks</h2>
          <ul className="items">
            {availableItems.map((item, index) => (
              <li key={index}>
                <button className="add" onClick={() => addItem(item)}>
                  <i className="fa-solid fa-plus"></i>
                </button>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Current Picks */}
        <div className="current">
          <h2>Current Picks</h2>
          <ul className="items">
            {currentList.map(({ item, quantity }, index) => (
              <li key={index}>
                <button className="remove" onClick={() => removeItem(item)}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                {item} x{quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* Meal Plan Options */}
        <div className="mealoptions">
          <h2>Meal Plan Options</h2>
          <ul className="items">
            {availableMeals.map((meal, index) => (
              <li key={index}>
                <button className="choose" onClick={() => addMeal(meal)}>
                  <i className="fa-solid fa-check"></i>
                </button>
                {meal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const adminLogin = "admin";
  const adminPassword = "swe123";

  const [username, checkUsername] = useState('');
  const [password, checkPassword] = useState('');
  const [isLoggedIn, checkIsLoggedIn] = useState(false);
  const [isGroceryList, checkGroceryList] = useState(false);
  const [isCreatingAccount, checkIsCreatingAccount] = useState(false);

  const login = (form: { preventDefault: () => void }) => {
    form.preventDefault();
    if (username === adminLogin && password === adminPassword) {
      checkIsLoggedIn(true);
    }
  };

  const createAccount = (form: { preventDefault: () => void }) => {
    form.preventDefault();
    console.log("Create account pressed");
  };

  function Dashboard() {
    function listClick() {
      console.log("list clicked");
      checkGroceryList(true);
    }

    return (
      <div className="dashboard">
        <h2>Grocery List Dashboard</h2>
        <div className="dashboard-list" onClick={listClick}>
          <h2>Create Grocery List</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='topDiv'>
      {isCreatingAccount ? (
        <div className="login">
          <h2>Create Account</h2>
          <form onSubmit={createAccount}>
            <div className='Username'>
              <label>Username</label>
              <input type="text" onChange={(form) => checkUsername(form.target.value)} />
            </div>
            <button type="submit">Create Account</button>
          </form>
        </div>
      ) : isLoggedIn ? (
        isGroceryList ? (
          <GroceryList />
        ) : (
          <Dashboard />
        )
      ) : (
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={login}>
            <div>
              <label>Username</label>
              <input type="text" onChange={(form) => checkUsername(form.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" onChange={(form) => checkPassword(form.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;



