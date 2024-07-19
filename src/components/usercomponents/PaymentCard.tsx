import React, { useEffect } from 'react';
import { useGetPaymentsMutation } from '../../service/paymentApi';
import Button from '../Button';
import { PaymentResponse, Payment } from '../../types/payment.types';

const PaymentCards: React.FC = () => {
  const [getPayments, { data: responseData }] =
    useGetPaymentsMutation<PaymentResponse>();

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  useEffect(() => {
    if (responseData) {
      console.log('Payments data:', responseData);
    }
  }, [responseData]);

  if (!responseData || !Array.isArray(responseData.data)) {
    return <div>No payments found.</div>;
  }

  const payments: Payment[] = responseData.data;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {payments.map((payment: Payment) => (
        <div key={payment.id} className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold">{payment.payment_method}</h3>
          <p>Amount: {payment.amount}</p>
          <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
          <Button
            type="button"
            title={payment.payment_status}
            className={`mt-4 w-full ${payment.payment_status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {payment.payment_status}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PaymentCards;
