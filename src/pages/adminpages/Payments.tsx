import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useFetchAllPaymentsQuery } from '../../service/OrderApi';
import { IPayment } from '../../types/Product.types';

const Payments: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const navigate = useNavigate();
  const { data: responseData, isLoading, isError } = useFetchAllPaymentsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading payments...</div>;
  }

  if (isError) {
    return <div>Failed to fetch payments. Please try again later.</div>;
  }

  const payments: IPayment[] = responseData?.data || [];

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(
    indexOfFirstPayment,
    indexOfLastPayment,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Date
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Payment Method
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Status
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {payment.payment_method}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      payment.payment_status === 'Completed'
                        ? 'bg-green-500'
                        : payment.payment_status === 'Pending'
                          ? 'bg-yellow-500'
                          : payment.payment_status === 'Canceled'
                            ? 'bg-red-500'
                            : 'bg-gray-500'
                    }`}
                  >
                    {payment.payment_status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{`$${payment.amount}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(payments.length / paymentsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-white'}`}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Payments;
