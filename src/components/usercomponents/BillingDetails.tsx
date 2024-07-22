import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components';
import {
  useCreateOrderMutation,
  useCreatePaymentSessionMutation,
} from '../../service/OrderApi';
import { Label } from '../rootcomponents/Label';
import { ToastContainer, toast } from 'react-toastify';
import {
  billingDetailsSchema,
  BillingDetailsFormData,
} from '../../utils/validations/billingDetailsSchema';
import 'react-toastify/dist/ReactToastify.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const BillingDetails: React.FC = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const [formData, setFormData] = useState<BillingDetailsFormData>({
    address: '',
    country: '',
    city: '',
    phone: '',
    zipCode: '',
    expectedDeliveryDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [
    createOrder,
    { isLoading: isCreatingOrder, isSuccess, isError, error },
  ] = useCreateOrderMutation();

  const [createPaymentSession] = useCreatePaymentSessionMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Order created successfully');
    }
    if (isError) {
      toast.error(`Error creating order: ${error}`);
    }
  }, [isSuccess, isError, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = billingDetailsSchema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.errors.forEach((error) => {
        if (error.path[0]) {
          formattedErrors[error.path[0]] = error.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    if (!isCreatingOrder) {
      const result = await createOrder({
        shipping_address: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zip_code: formData.zipCode,
        },
        ...formData,
        totalPrice: undefined,
        products: undefined,
        total: undefined,
        items: undefined,
        id: undefined,
      });

      if (result.data && selectedPaymentMethod === 'Bank') {
        setIsLoading(true);
        const orderId = result.data.data.id;

        // Initiate payment
        const paymentResult = await createPaymentSession({ orderId });
        console.log(paymentResult.data.session.url);

        if (paymentResult.data) {
          window.location.href = paymentResult.data.session.url;
        } else {
          toast.error('Error initiating payment');
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full max-w-screen-lg mx-auto">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Billing Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
          </div>
          <div>
            <Label htmlFor="expectedDeliveryDate">Expected Delivery Date</Label>
            <input
              type="date"
              name="expectedDeliveryDate"
              id="expectedDeliveryDate"
              placeholder="Expected Delivery Date"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.expectedDeliveryDate && (
              <p className="text-red-500">{errors.expectedDeliveryDate}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              value="Bank"
              className="mr-2"
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="bank" className="text-gray-700">
              Bank
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="mobileMoney"
              name="paymentMethod"
              value="Mobile Money"
              className="mr-2"
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="mobileMoney" className="text-gray-700">
              Mobile Money
            </label>
          </div>
        </div>
        <Button
          type="submit"
          title="Place Order"
          className="mt-6 w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600"
          disabled={isLoading || isCreatingOrder}
        >
          {isLoading ? 'Processing Payment...' : 'Place Order'}
        </Button>
      </form>
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Order Summary
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div>{item.name}</div>
              <div>${item.price}</div>
            </div>
          ))}
          <div className="flex justify-between items-center border-t pt-4">
            <div>Subtotal:</div>
            <div>
              $
              {cartItems.reduce(
                (sum: number, item: CartItem) => sum + item.price,
                0,
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>Shipping:</div>
            <div>Free</div>
          </div>
          <div className="flex justify-between items-center font-bold border-t pt-4">
            <div>Total:</div>
            <div>
              $
              {cartItems.reduce(
                (sum: number, item: CartItem) => sum + item.price,
                0,
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
