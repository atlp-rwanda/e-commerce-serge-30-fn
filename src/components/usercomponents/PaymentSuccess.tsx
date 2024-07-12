import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToPayments = () => {
    navigate('/payment/all');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-xl">Thank you for shopping with us.</p>
      <Button
        type="button"
        title="View Orders"
        onClick={handleGoToPayments}
        className="mt-6 bg-green-500 w-auto min-w-[120px] px-4 py-2"
      >
        Manage your Payments
      </Button>
    </div>
  );
};

export default PaymentSuccess;
