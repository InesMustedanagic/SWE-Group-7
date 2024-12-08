import React from 'react';

interface CartProps {
  currentList: string[];
  onRemoveItem: (item: string) => Promise<void>;
  totalAmount: number;
  onProceedToPayment: () => void;
  onBackToDashboard: () => void;
}

const Cart: React.FC<CartProps> = ({ currentList, onRemoveItem, totalAmount, onProceedToPayment, onBackToDashboard }) => {
  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {currentList.map((item, index) => (
          <li key={index}>
            {item} 
            <button onClick={() => onRemoveItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalAmount}</p>
      <button onClick={onProceedToPayment}>Proceed to Payment</button>
      <button onClick={onBackToDashboard}>Back to Dashboard</button>
    </div>
  );
};

export default Cart;
