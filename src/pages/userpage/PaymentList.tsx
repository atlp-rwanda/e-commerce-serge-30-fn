import React from 'react';
import PaymentCards from '../../components/usercomponents/PaymentCard';

const PaymentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">My Payments</h1>
        <PaymentCards />
      </div>
    </div>
  );
};

export default PaymentsPage;
