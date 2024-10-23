import { useState } from 'react';
import './App.css'

function App() {
  

  function Dashboard(){
    
    function listClick(){
      console.log("list clicked")
      checkGroceryList(true);
    }
    
    
    return (
      
        
        <div className="dashboard">
          <h2>Grocery List Dashboard</h2>
        

        <div className="dashboard-list" onClick={listClick}>
            <h2> Create Grocery List </h2>
        </div>
      
        </div>
    );
  }

  function GroceryList() {
    const [availableItems] = useState([
      "Apples",
      "Bananas",
      "Bread",
      "Milk",
      "Eggs",
    ]);
    const [currentList, checkCurrentList] = useState<string[]>([]);
  
    const addItem = (item: string) => {
      // Add the item to the current list
      checkCurrentList(prevList => [...prevList, item]);
    };

    const [favorite, checkFavorite] = useState<string[]>([]);
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
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const adminLogin = "";
  const adminPassword = "";
  
  const [username, checkUsername] = useState('');
  const [password, checkPassword] = useState('');
  const [isLoggedIn, checkIsLoggedIn] = useState(false);
  const [isGroceryList, checkGroceryList] = useState(false);

  const login = (form: { preventDefault: () => void; }) => {
    form.preventDefault();
    if (username === adminLogin && password == adminPassword){
      console.log("admin logged in");
      checkIsLoggedIn(true);
    }
  }


  return (
    <div>
      {isLoggedIn ? (
        isGroceryList ? (
          <GroceryList/> ) :
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

          <button type="submit">Login</button>
        </form>
      
      </div>
      )}
  </div>
  )
}

export default App



