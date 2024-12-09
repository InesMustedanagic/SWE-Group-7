import React from 'react';
import './Cart.css';

interface CartProps {
  currentList: string[];
  onRemoveItem: (item: string) => Promise<void>;
  totalAmount: number;
  onProceedToPayment: () => void;
  onBackToDashboard: () => void;
}

const Cart: React.FC<CartProps> = ({
  currentList,
  onRemoveItem,
  totalAmount,
  onProceedToPayment,
  onBackToDashboard,
}) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {currentList.length > 0 ? (
          currentList.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item}</span>
              <button onClick={() => onRemoveItem(item)} className="remove-button">
                Remove
              </button>
            </li>
          ))
        ) : (
          <p className="empty-message">Your cart is empty.</p>
        )}
      </ul>
      <p className="total-amount">Total: ${totalAmount}</p>
      <div className="cart-buttons">
        <button onClick={onProceedToPayment} className="primary-button">
          Proceed to Payment
        </button>
        <button onClick={onBackToDashboard} className="secondary-button">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Cart;
