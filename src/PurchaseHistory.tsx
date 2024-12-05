
import React, { useState, useEffect } from 'react';

import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

interface PurchaseHistoryProps {
  onBackToDashboard: () => void;
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ onBackToDashboard }) => {
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);

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

  return (
    <div className="purchase-history">
      <h2>Your Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchase history found.</p>
      ) : (
        <ul>
          {purchaseHistory.map((purchase, index) => (
            <li key={index}>
              <strong>Order #{purchase.id}</strong><br />
              <span>Items: {purchase.items.join(', ')}</span><br />
              <span>Total: ${purchase.total}</span><br />
              <span>Date: {new Date(purchase.date.seconds * 1000).toLocaleDateString()}</span>
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
