import React from 'react';
import './Cart.css';
import './Cart.css';


// same interface as our app file
// just to match with database
interface GroceryItem {
  id: string;
  name: string;
  price: number;
}

// interface for our chosen items in the cart
// void if we pay or remove the items
// just storage stuff
export interface CartProps {
  currentList: GroceryItem[];
  onRemoveItem: (item: GroceryItem) => void;
  totalAmount: number;
  onProceedToPayment: () => void;
  onBackToDashboard: () => void;
}



// react component of our cart
// shows your current stuff, can remove items, total amount, payment, and dashboard
// all used in a cart
const Cart: React.FC<CartProps> = ({
  currentList,
  onRemoveItem,
  totalAmount,
  onProceedToPayment,
  onBackToDashboard,
}) => {
  

  // using this interface we have functions
  // this is the total cost of an item
  const calculateTotal = () => {
    return currentList.reduce((sum, item) => sum + (item.price || 0), 0);
  };
  
  
  const total = calculateTotal();




  // returns a div of our screen
  // some front end work
  // checks if list is empty and tells user
  // returns each item, name, price, and allows user to remove item from the list
  // doesnt allow me to comment down there because of html
  // basic front end stuff of pressing buttons and displaying information below
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
