import React, { useState, useRef, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { Link } from 'react-router-dom';




// another interface
// using to allow input from user
// just to make easy interface for user
interface LoginProps {
  onLogin: (event: FormEvent<Element>) => Promise<void>;
  userError: string | null;
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}





// react component
// using login function
// and react states
// email and password entries
const Login: React.FC<LoginProps> = ({ onLogin, userError, usernameRef, passwordRef }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(userError);
  const [loading, setLoading] = useState<boolean>(false);


  // submission of login form
  // waiting for user
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);


    // making sure both entries are full
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);



    // trying to login with firebase credentials
    // checks the firebase and tells user if there was an error with loggin in using info
    // logs results
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  

  // html frontend stuff
  // commenting all of what is below because it doesnt allow me
  // creating divs, a form, buttons, entry fields, and link to sign up page
  // just allows user to fill in user and password
  // submit button
  // and can switch to account creation
  // running function on whatver user picks
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={usernameRef} 
            required
          />
        </div>
        
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef} 
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
