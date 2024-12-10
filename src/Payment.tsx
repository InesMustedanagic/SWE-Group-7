import React, { useState } from 'react';
import './Payment.css';


// another interface
// used for database storage
interface PaymentProps {
  totalAmount: number;
  onSuccess: () => void;
  onCancel: () => void;
}


// react component
// used for processing payments on the card used in grocery list
const Payment: React.FC<PaymentProps> = ({ totalAmount, onSuccess, onCancel }) => {
  
  // all const used for card information
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [error, setError] = useState<string>('');



  // changes in the card information
  // sensitive information so we change if the user needs to change to avoid errors in credit card
  // using react component to handle that
  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value);
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value);
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value);
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value);


  // all of these are test cases to make sure the form was filled correctly
  const validateForm = (): boolean => {
    
    // all forms filled out
    if (!cardName || !cardNumber || !expirationDate || !cvv) {
      setError('Please fill in all fields.');
      return false;
    }

    // card is 16 digits long
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Card number should be 16 digits.');
      return false;
    }
    
    // cvv is 3 or 4 digits long
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('CVV should be 3 or 4 digits.');
      return false;
    }

    // expiration is correct format
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      setError('Expiration date should be in MM/YY format.');
      return false;
    }

    // if nothing is failed, no error and return true on the function
    setError('');
    return true;
  };



  // payment is handled if the form has been validated previously
  // log the payment and run success function
  const handlePayment = () => {
    if (validateForm()) {
      
      console.log('Payment processed!');
      onSuccess();
    }
  };





  // will be commenting all html code below because it doesnt allow me to comment in line
  // asic front end work
  // divs, headers, displaying information
  // running functions on change
  // showing values in certain fields
  // logging errors
  // making ui
  return (
    <div className="payment">
      <h2>Payment</h2>
      <p>Total Amount: ${totalAmount}</p>

      <form>
        <div className="form-group">
          <label htmlFor="cardName">Cardholder's Name</label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={handleCardNameChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9876 5432"
            maxLength={16}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date (MM/YY)</label>
          <input
            type="text"
            id="expirationDate"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            placeholder="MM/YY"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="123"
            maxLength={4}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="button" onClick={handlePayment}>Pay Now</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default Payment;
