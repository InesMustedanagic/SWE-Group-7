
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { auth } from './firebase-config';
import { updateProfile } from 'firebase/auth';



// only need back to dashboard on the interface
// no other functionality needed
interface ProfileProps {
  onBackToDashboard: () => void;
}


// react component
// this will be used to save and go back to dashboard on profile section
const Profile: React.FC<ProfileProps> = ({ onBackToDashboard }) => {
  
  
  // using current user information
  // having a display name and email stored by the firebase
  // retrieves information as well
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState<string>(user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [error, setError] = useState<string | null>(null);




  // this is for trying to save any changes
  // waiting if the user presses save and updating if the user does
  // try catch statement
  // throws error if needed
  const handleSave = async () => {
    if (displayName && email) {
      try {
        if (user) {
          await updateProfile(user, {
            displayName,
          });
          setError(null);
          alert('Profile updated successfully!');
        }
      } catch (error) {
        setError('Failed to update profile');
      }
    } else {
      setError('Please fill in all fields');
    }
  };



  

  // html code below needs to be commented out up here
  // basic front end stuff
  // divs, buttons, displaying information, running functions if needed
  return (
    <div className="profile">
      <div className="login">
        <h2>Profile</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="button" onClick={handleSave}>Save</button>
        </form>

        <button className="back-to-dashboard" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
