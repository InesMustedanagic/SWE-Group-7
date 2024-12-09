import React from 'react';
import './Cart.css';
import './Cart.css';

interface GroceryItem {
  id: string;
  name: string;
  price: number;
}

export interface CartProps {
  currentList: GroceryItem[];
  onRemoveItem: (item: GroceryItem) => void;
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
  
  const calculateTotal = () => {
    return currentList.reduce((sum, item) => sum + (item.price || 0), 0);
  };


  const total = calculateTotal();

  return (
    <div>
      <h2>Your Cart</h2>
      {}
      {currentList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        currentList.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button onClick={() => onRemoveItem(item)}>Remove</button>
          </div>
        ))
      )}

      <div className="total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>

      <div className="cart-actions">
        <button onClick={onProceedToPayment}>Proceed to Payment</button>
        <button onClick={onBackToDashboard}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default Cart;
