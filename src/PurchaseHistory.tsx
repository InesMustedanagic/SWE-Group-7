import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './PurchaseHistory.css';




// another interface
// uses dashboard button to return
interface PurchaseHistoryProps {
  onBackToDashboard: () => void;
}



// react component
// uses for purchase history
// uses this for firebase 
const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ onBackToDashboard }) => {
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);


  // this is the purchase history
  // gets references of the database purchase history
  // if no error, pulls each purchase, and shows to user
  // if error it will log
  // try catch statement
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'purchaseHistory'));
        const historyList: any[] = [];
        querySnapshot.forEach(doc => {
          historyList.push({ id: doc.id, ...doc.data() });
        });
        setPurchaseHistory(historyList);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchPurchaseHistory();
  }, []);



  // html code below needs to be commented out up here
  // basic front end stuff
  // divs,displaying information, running functions
  // displaying all recent purchases to users
  // formatting
  return (
    <div className="purchase-history">
      <h2>Your Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchase history found.</p>
      ) : (
        <ul>
          {purchaseHistory.map((purchase) => (
            <li key={purchase.id}>
              <strong>Order #{purchase.id}</strong><br />
              <span>Items: {purchase.items.join(', ')}</span><br />
              <span>Total: ${purchase.total}</span><br />
              <span>Date: {purchase.date ? new Date(purchase.date.seconds * 1000).toLocaleDateString() : "N/A"}</span>
            </li>
          ))}
        </ul>
      )}

      <button className="back-to-dashboard" onClick={onBackToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default PurchaseHistory;
