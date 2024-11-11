// need to separate this file into components to be less confusing

import { useState } from 'react';
import './App.css'

function App() {
  
  // changes state of grocery list view
  function Dashboard(){
    
    function listClick(){
      console.log("list clicked")
      checkGroceryList(true);
    }
    
    
    // returning the page to be viewed when state changed
    return (
      
        <div className="dashboard">
          <h2>Grocery List Dashboard</h2>
          <div className="dashboard-list" onClick={listClick}>
              <h2> Create Grocery List </h2>
          </div>
      
        </div>
    );
  }

  // function to display grocery list page
  function GroceryList() {
    const [availableItems] = useState([
      "Apples",
      "Bananas",
      "Bread",
      "Milk",
      "Eggs",
    ]);


    // creating use states to be updated
    const [currentList, checkCurrentList] = useState<string[]>([]);
    const [availableMeals] = useState(["Burgers", "Chicken Tenders", "Lasagna", "Salad"]);
    const [chosenMeals, checkMeals] = useState<string[]>([]);

    const [Burgers] = useState(["Bread", "Lettuce", "Meat", "Tomato", "Onions"]);
    const [Chicken_Tenders] = useState(["Chicken", "Fries", "Ketchup"]);
    const [Lasagna] = useState(["Tomato", "Cheese", "Meat"]);
    const [Salad] = useState(["Lettuce", "Tomato", "Dressing", "Cheese"]);

    // add items to current picks
    const addItem = (item: string) => {
      checkCurrentList(prevList => [...prevList, item]);
    };

    // add meal function
    // toggles ingredients if selected
    const addMeal = (item: string) => {
      checkMeals(prevList => {
        if (prevList.includes(item)) {
          checkCurrentList(prevList => prevList.filter(ingredient => !getIngredients(item).includes(ingredient)));
          return prevList.filter(meal => meal !== item);
        } else {
          checkCurrentList(prevList => [...prevList, ...getIngredients(item)]);
          return [...prevList, item];
        }
      });
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


    // use state for favorite item
    const [favorite, checkFavorite] = useState<string[]>([]);


    // toggles favorite if button clicked and displays
    const addFavorite = (item: string) => {
      checkFavorite(prevList => {
      if (prevList.includes(item)){
        return prevList.filter(fav => fav !== item);
      }
      else{
        return [...prevList, item];
    }
      });
    };

    const removeItem = (item: string) => {
      checkCurrentList(prevList => prevList.filter(currentItem => currentItem !== item));
    };

    // use state for user reviews
    const [Review, checkReview] = useState('')
    const Reviews = (value: string) => {
      checkReview(value)
    }


    // logging user reviews
    const addReview = (item: string) => {
      console.log('Review added:', Review);
      checkReview('');
    }
    

    // this is what will display on grocery page once use state is true
    return (
      <div className='picks'>
        
        <div className='available'>
          <h2>Available picks!</h2>
          <ul>
            {availableItems.map((item, index) => (
              <li key={index}>
                <button onClick={() => addFavorite(item)}>❤️</button>
                {item}
                <button onClick={() => addItem(item)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='favorite'>
          <h2>Favorites</h2>
          <ul>
            {favorite.map((item, index) => (
              <li key={index}>{item}</li>
              
            ))}
          </ul>
        </div>
        
        <div className='current'>
          <h2>Current picks</h2>
          <ul>
            {currentList.map((item, index) => (
              <li key={index}>{item}
              <button onClick={() => removeItem(item)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div className='mealoptions'>
          <h2>Meal Plan Options</h2>
          <ul>
            {availableMeals.map((item, index) => (
              <li key={index}>{item}<button onClick={() => addMeal(item)}>Choose</button></li>
            ))}
          </ul>
        </div>

        {/* <div className='mealchosen'>
          <h2>Meal Plans Chosen</h2>
          <ul>
            {chosenMeals.map((item, index) => (
              <li key={index}>{item}<li>ingredients:</li>
                {item === "Burgers" ? Burgers.map((item, index) => (<li key={index}>{item}</li>)) :
                item === "Chicken Tenders" ? Chicken_Tenders.map((item, index) => (<li key={index}>{item}</li>)) :
                item === "Lasagna" ? Lasagna.map((item, index) => (<li key={index}>{item}</li>)) :
                item === "Salad" ? Salad.map((item, index) => (<li key={index}>{item}</li>)) : null}<p></p></li>
            ))}
          </ul>
        </div> */}

        <div className='userreview'>
          <h2>User Reviews</h2>
          <ul>
          
            <input value={Review} onChange={(form) => Reviews(form.target.value)}></input><button onClick={() => addReview(Review)}>Add</button>
          </ul>
        </div>
      </div>
    );
  }


  // admin login credentials
  // maybe put in .env file
  const adminLogin = "admin";
  const adminPassword = "swe123";
  

  // more use states
  const [username, checkUsername] = useState('');
  const [password, checkPassword] = useState('');
  const [isLoggedIn, checkIsLoggedIn] = useState(false);
  const [isGroceryList, checkGroceryList] = useState(false);
  const [isCreatingAccount, checkIsCreatingAccount] = useState(false);
  const [accountUsername, checkAccountUsername] = useState('');
  const [accountPassword, checkAccountPassword] = useState('');
  const [accountFirstName, checkAccountFirstName] = useState('');
  const [accountLastName, checkAccountLastName] = useState('');
  const [accountEmail, checkAccountEmail] = useState('');


  // use state updating to see if admin is logging in
  const login = (form: { preventDefault: () => void; }) => {
    form.preventDefault();
    if (username === adminLogin && password == adminPassword){
      console.log("admin logged in");
      checkIsLoggedIn(true);
    }
  }

  // use state to see if someone is creating account
  const createAccount = (form: { preventDefault: () => void; }) => {
    form.preventDefault();
    console.log("create acc pressed")
  };


  // this returns the create account and login page. 
  // this is a ternary operator and we should find easier way to implement this
  // logic to see what page you should see depending on use states

  return (
    <div>
      {isCreatingAccount ? 
        
        (
        <div className='login'>
          <h2>Create Account Page</h2>
          <form onSubmit={createAccount}>
            
            <div>
              <label>Username </label>
              <input type="text" value={accountUsername} onChange={(form) => checkAccountUsername(form.target.value)} />
            </div>
            
            <div>
              <label>Password </label>
              <input type="password" value={accountPassword} onChange={(form) => checkAccountPassword(form.target.value)} />
            </div>

            <div>
              <label>First Name </label>
              <input type="text" value={accountFirstName} onChange={(form) => checkAccountFirstName(form.target.value)} />
            </div>

            <div>
              <label>Last Name </label>
              <input type="text" value={accountLastName} onChange={(form) => checkAccountLastName(form.target.value)} />
            </div>

            <div>
              <label>Email </label>
              <input type="text" value={accountEmail} onChange={(form) => checkAccountEmail(form.target.value)} />
            </div>

            <button type="submit">Create Account</button>
            <button onClick={() => checkIsCreatingAccount(false)}>Cancel</button>
          </form>
        </div>
      ) :
      
      isLoggedIn ? 
      (
        isGroceryList ? 
        (
          <GroceryList/> ) 
          :
          ( <Dashboard /> )
      ) : (
      

      <div className='login'>

        <h2>Login Page</h2>
      
        <form onSubmit={login}>
          <div>
            <label>Username </label>
            <input type="text" value={username} onChange={(form) => checkUsername(form.target.value)}/>
          </div>
        
          <div>
            <label>Password </label>
            <input type="password" value={password} onChange={(form) => checkPassword(form.target.value)}/>
          </div>
          <button type='button' className='createAccount' onClick={() => checkIsCreatingAccount(true)}>Create Account</button>
          <button type="submit">Login</button>
        </form>
      
      </div>
      )}
  </div>
  )
}

export default App



