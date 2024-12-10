import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

import { Link, useNavigate } from 'react-router-dom';



// another react component
// this is used to store all information stored by new user
// stores email, password, and if the user gets error
const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  // pressing submit button
  // waiting for user to submit check information
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);



    // if any field empty, tell user
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }


    // if passwords dont match, tell user
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // if password too short, tell user
    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    setLoading(true);


    // try to register user with firebase
    // try catch statement
    // tries to run query on database
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  // html code below needs to be commented out up here
  // basic front end stuff
  // divs, buttons, displaying information, running functions
  // formatting information
  // allowing user to have easy and informative sign in process
  return (
    <div className="login">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
