import React from 'react';

interface PaymentProps {
  totalAmount: number;
  onPaymentSuccess: () => void;
}

const Payment: React.FC<PaymentProps> = ({ totalAmount, onPaymentSuccess }) => {
  const handlePayment = () => {
    
    console.log('Payment processed!');
    onPaymentSuccess();
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