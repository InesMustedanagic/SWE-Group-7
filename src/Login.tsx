// import React, { useState, useRef } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebase-config';
// import { Link } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError(null); // Clear previous errors

//     if (!email || !password) {
//       setError('Please enter both email and password');
//       return;
//     }

//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('User logged in');
//     } catch (error: any) {
//       setError(error.message); // Display error message
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/signup">Sign up here</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useRef, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { Link } from 'react-router-dom';

// Define the props interface
interface LoginProps {
  onLogin: (event: FormEvent<Element>) => Promise<void>;
  userError: string | null;
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

const Login: React.FC<LoginProps> = ({ onLogin, userError, usernameRef, passwordRef }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(userError);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
    } catch (error: any) {
      setError(error.message); // Display error message
    } finally {
      setLoading(false);
    }
  };

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
            ref={usernameRef}  // Attach ref for username
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
            ref={passwordRef}  // Attach ref for password
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
