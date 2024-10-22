import { useState } from 'react';
import './App.css'

function App() {
  
  function Dashboard() {

    function GroceryList() {

    }
    
    function listClick() {
      console.log("list clicked")
    }

    const [Pressed, IsPressed] = useState(false);

    const Create_Grocery_List =(form: { preventDefault: () => void; }) => {
      form.preventDefault();
      console.log("admin clicked");
      IsPressed(true)
    }

    return (
      
        <div className="dashboard">
          <h2>Grocery List Dashboard</h2>
        

        <div className="dashboard-list" onClick={listClick}>
          <h2> Create Grocery List </h2>
          function listClick() {

          }
          {Pressed ? (
            <GroceryList />
          ) : (
            <form onSubmit={login}>
          
            </form>
          )}
            
        </div>
      
        </div>
    );
  }

  function GroceryList() {

  }

  const adminLogin = "";
  const adminPassword = "";
  
  const [username, checkUsername] = useState('');
  const [password, checkPassword] = useState('');
  const [isLoggedIn, checkIsLoggedIn] = useState(false);

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
        <Dashboard />
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
