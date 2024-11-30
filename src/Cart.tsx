import React from 'react';

interface CartProps {
  currentList: string[]; // The list of items in the cart
  onRemoveItem: (item: string) => void; // Function to remove items from the cart
  onProceedToPayment: () => void; // Function to navigate to the payment page
}

const Cart: React.FC<CartProps> = ({ currentList, onRemoveItem, onProceedToPayment }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {currentList.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul>
          {currentList.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => onRemoveItem(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default Cart;