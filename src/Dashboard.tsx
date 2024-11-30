// Dashboard.tsx
import React from 'react';
import './Dashboard.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

interface DashboardProps {
  onNavigateToList: () => void;
  onNavigateToCart: () => void;
  onNavigateToPayment: () => void;
  onNavigateToAccount: () => void;
  onNavigateToPurchaseHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToList, onNavigateToCart, onNavigateToPayment, onNavigateToAccount, onNavigateToPurchaseHistory}) => {
  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User logged out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Grocery List Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <div className="dashboard-list" onClick={onNavigateToList}>
        <h2>Create Grocery List</h2>
      </div>
      <div className="dashboard-list" onClick={onNavigateToPurchaseHistory}>
        <h2>Purchase History</h2>
      </div>
      <div className="dashboard-list" onClick={onNavigateToAccount}>
        <h2>Update Profile</h2>
      </div>
      <button onClick={onNavigateToCart}>Go to Cart</button>
      <button onClick={onNavigateToPayment}>Proceed to Payment</button>
    </div>

    
  );
};

export default Dashboard;
