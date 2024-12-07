// import React, { useState } from 'react';
// import './Payment.css';

// interface PaymentProps {
//   totalAmount: number; // The total price of the items in the cart
//   onPaymentSuccess: () => void; // Callback to navigate back to the dashboard after successful payment
// }

// const Payment: React.FC<PaymentProps> = ({ totalAmount, onPaymentSuccess }) => {
//   const [cardName, setCardName] = useState<string>('');
//   const [cardNumber, setCardNumber] = useState<string>('');
//   const [expirationDate, setExpirationDate] = useState<string>('');
//   const [cvv, setCvv] = useState<string>('');
//   const [error, setError] = useState<string>('');

//   // Handle form field changes
//   const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value);
//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value);
//   const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value);
//   const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value);

//   const validateForm = (): boolean => {
//     if (!cardName || !cardNumber || !expirationDate || !cvv) {
//       setError('Please fill in all fields.');
//       return false;
//     }

//     // Basic validation for card number and CVV length
//     if (!/^\d{16}$/.test(cardNumber)) {
//       setError('Card number should be 16 digits.');
//       return false;
//     }
    
//     if (!/^\d{3,4}$/.test(cvv)) {
//       setError('CVV should be 3 or 4 digits.');
//       return false;
//     }

//     // Basic validation for expiration date (MM/YY format)
//     if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
//       setError('Expiration date should be in MM/YY format.');
//       return false;
//     }

//     setError('');
//     return true;
//   };

//   const handlePayment = () => {
//     if (validateForm()) {
//       // Simulate payment success (you can integrate a real payment gateway here)
//       console.log('Payment processed!');
//       onPaymentSuccess(); // After payment success, navigate to dashboard or reset state
//     }
//   };

//   return (
//     <div className="payment">
//       <h2>Payment</h2>
//       <p>Total Amount: ${totalAmount}</p>

//       <form>
//         <div className="form-group">
//           <label htmlFor="cardName">Cardholder's Name</label>
//           <input
//             type="text"
//             id="cardName"
//             value={cardName}
//             onChange={handleCardNameChange}
//             placeholder="John Doe"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="cardNumber">Card Number</label>
//           <input
//             type="text"
//             id="cardNumber"
//             value={cardNumber}
//             onChange={handleCardNumberChange}
//             placeholder="1234 5678 9876 5432"
//             maxLength={16}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="expirationDate">Expiration Date (MM/YY)</label>
//           <input
//             type="text"
//             id="expirationDate"
//             value={expirationDate}
//             onChange={handleExpirationDateChange}
//             placeholder="MM/YY"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="cvv">CVV</label>
//           <input
//             type="text"
//             id="cvv"
//             value={cvv}
//             onChange={handleCvvChange}
//             placeholder="123"
//             maxLength={4}
//             required
//           />
//         </div>

//         {error && <p className="error-message">{error}</p>}

//         <button type="button" onClick={handlePayment}>Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default Payment;



import React, { useState } from 'react';
import './Payment.css';

interface PaymentProps {
  totalAmount: number; // The total price of the items in the cart
  onSuccess: () => void; // Callback to navigate back to the dashboard after successful payment
  onCancel: () => void;  // Callback for when the user cancels the payment
}

const Payment: React.FC<PaymentProps> = ({ totalAmount, onSuccess, onCancel }) => {
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Handle form field changes
  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value);
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value);
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value);
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value);

  const validateForm = (): boolean => {
    if (!cardName || !cardNumber || !expirationDate || !cvv) {
      setError('Please fill in all fields.');
      return false;
    }

    // Basic validation for card number and CVV length
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Card number should be 16 digits.');
      return false;
    }
    
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('CVV should be 3 or 4 digits.');
      return false;
    }

    // Basic validation for expiration date (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      setError('Expiration date should be in MM/YY format.');
      return false;
    }

    setError('');
    return true;
  };

  const handlePayment = () => {
    if (validateForm()) {
      // Simulate payment success (you can integrate a real payment gateway here)
      console.log('Payment processed!');
      onSuccess(); // After payment success, trigger onSuccess callback
    }
  };

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
