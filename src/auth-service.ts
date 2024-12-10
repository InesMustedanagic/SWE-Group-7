import { auth } from './firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';



// file meant to make user login is correct
// matches information input with database storage
// trying to log in with user and password and logging the error if incorrect
export const loginUser = async (email: string, password: string) => {
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } 
  catch (error) {
    console.error('Login error: ', error);
    throw error;
  }
};


// same authentification with logging in but for creating account
// checking database with new credentials
// showing error if its wrong
export const createUser = async (email: string, password: string) => {
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;} 
    
    catch (error) {
    console.error('Account creation error: ', error);
    throw error;
  }
};