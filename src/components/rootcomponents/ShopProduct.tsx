import React from 'react';
import StarIcon from './StarIcon';
import { Button } from './Button';
import {
  useAddToCartMutation,
  useGetAllProductsQuery,
} from '../../service/authApi';
import { CartProduct } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import { useToken } from '../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import ProductLoader from './ProductLoader';

const ShopProduct: React.FC = () => {
  const { token, user } = useToken();
  const { data: products, error, isLoading } = useGetAllProductsQuery({});
  const [addToCart, { isLoading: addtocartLoading }] = useAddToCartMutation();
  const navigate = useNavigate();

  const handleAddToCart = async (product: CartProduct) => {
    if (!user || !token) {
      toast.error('Please Log In');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2500);
      return;
    }
    const response = await addToCart({
      productid: product.product_id,
      quantity: product.quantity,
    });
    if (response.data) {
      const message = `${product.name} added to cart`;
      toast.success(message);
      return;
    }
  };

  if (isLoading || addtocartLoading)
    return (
      <div className="flex items-center ">
        <h1>loading</h1>
        <ProductLoader count={9} />
      </div>
    );
  if (error)
    return <div className="flex items-center ">Error: {error.toString()}</div>;
  const productsData =
    products.data.length > 9 ? products.data.slice(0, 9) : products.data;

  return (
    <div className="flex flex-wrap gap-8">
      <ToastContainer />
      {productsData.map((product: CartProduct) => (
        <div
          key={product.product_id}
          className="group bg-white drop-shadow-sm w-72 rounded-md transition-all ease-in-out overflow-hidden "
        >
          <div className="overflow-hidden">
            <img
              src={product.image_url[0]}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-100 "
            />
          </div>
          <div className="px-4 py-2">
            <h2 className="font-bold">{product.name}</h2>
            <h4 className="text-blue-900 font-medium py-2  transition-all ease-in-out group-hover:py-2">
              save up to $102
            </h4>
            <div className="flex gap-2 items-center my-2 group-hover:hidden transition-all ease-in-out">
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} color="text-yellow-500" size="w-4 h-4" />
              ))}
              <span className="text-xs">(102)</span>
            </div>
            <h2 className="font-bold py-2 group-hover:py-0">{product.price}</h2>
            <Button
              children="Buy Now"
              className=" hidden group-hover:block bg-black text-white py-2 px-6 rounded-sm w-full "
              onClick={() => handleAddToCart(product)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProduct;
