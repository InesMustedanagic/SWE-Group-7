// Profile.tsx
import React, { useState, useEffect } from 'react';
// import './Profile.css'
import { auth } from './firebase-config';
import { updateProfile } from 'firebase/auth';

interface ProfileProps {
  onBackToDashboard: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBackToDashboard }) => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState<string>(user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="profile">
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
  );
};

export default Profile;
