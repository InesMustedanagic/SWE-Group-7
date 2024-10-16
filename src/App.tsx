import { useState } from 'react';
import './App.css'

function App() {
  
  const adminLogin = "adminG7";
  const adminPassword = "SWE123";
  
  const [username, checkUsername] = useState('');
  const [password, checkPassword] = useState('');

  const login = (form: { preventDefault: () => void; }) => {
    form.preventDefault();
    if (username === adminLogin && password == adminPassword){
      console.log("admin logged in");
    }
  }


  return (
    
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
      
  
  )
}

export default App
