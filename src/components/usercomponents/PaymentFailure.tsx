import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600">Payment Cancelled!</h1>
      <p className="mt-4 text-xl">
        Something went wrong with your payment, or you might have cancelled it
        intentionally
      </p>
      <Button
        type="button"
        title="Go to Home"
        onClick={handleGoToHome}
        className="mt-6 bg-red-500 w-auto min-w-[120px] px-4 py-2"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default PaymentFailure;
