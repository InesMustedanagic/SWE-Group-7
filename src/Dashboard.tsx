import React from 'react';
import './App.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

interface DashboardProps {
  onNavigateToList: () => void;
  onNavigateToCart: () => void;
  onNavigateToPayment: () => void;
  onNavigateToAccount: () => void;
  onNavigateToPurchaseHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  onNavigateToList,
  onNavigateToCart,
  onNavigateToPayment,
  onNavigateToAccount,
  onNavigateToPurchaseHistory,
}) => {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="dashboard">
      <button className="back-button" onClick={logout}>
        Logout
      </button>
      <h2>Grocery List Dashboard</h2>
      <div className="dashboard-list" onClick={onNavigateToList}>
        <h2>Create Grocery List</h2>
      </div>
      <div className="dashboard-list" onClick={onNavigateToPurchaseHistory}>
        <h2>Purchase History</h2>
      </div>
      <div className="dashboard-list" onClick={onNavigateToAccount}>
        <h2>Update Profile</h2>
      </div>
      <div className="dashboard-buttons">
        <button className="add" onClick={onNavigateToCart}>
          Go to Cart
        </button>
        <button className="add" onClick={onNavigateToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
