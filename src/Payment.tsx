import React from 'react';
// import 'Payment.css';

interface PaymentProps {
  totalAmount: number; // The total price of the items in the cart
  onPaymentSuccess: () => void; // Callback to navigate back to the dashboard after successful payment
}

const Payment: React.FC<PaymentProps> = ({ totalAmount, onPaymentSuccess }) => {
  const handlePayment = () => {
    // Simulate payment success (you can integrate a real payment gateway here)
    console.log('Payment processed!');
    onPaymentSuccess(); // After payment success, navigate to dashboard or reset state
  };

  return (
    <div className="payment">
      <h2>Payment</h2>
      <p>Total Amount: ${totalAmount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;