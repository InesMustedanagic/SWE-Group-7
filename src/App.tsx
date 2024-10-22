import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Create GroceryList component
function GroceryList() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
      <h2>Your Grocery List</h2>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new item"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Grocery List Dashboard</h2>
      <Link to="GroceryList" className="dashboard-list">
        <h2>Create Grocery List</h2>
      </Link>
    </div>
  );
}

function App() {
  const adminLogin = '';
  const adminPassword = '';

  const [username, checkUsername] = useState('');
  const [password, checkPassword] = useState('');
  const [isLoggedIn, checkIsLoggedIn] = useState(false);

  const login = (form: { preventDefault: () => void }) => {
    form.preventDefault();
    if (username === adminLogin && password === adminPassword) {
      console.log('admin logged in');
      checkIsLoggedIn(true);
    }
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/grocery-list" element={<GroceryList />} />
          </Routes>
        ) : (
          <div className='login'>
            <h2>Login Page</h2>
            <form onSubmit={login}>
              <div>
                <label>Username </label>
                <input type="text" value={username} onChange={(form) => checkUsername(form.target.value)} />
              </div>
              <div>
                <label>Password </label>
                <input type="password" value={password} onChange={(form) => checkPassword(form.target.value)} />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;





