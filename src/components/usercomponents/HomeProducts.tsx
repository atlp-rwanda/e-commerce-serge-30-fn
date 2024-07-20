import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useGetAllProductsQuery } from '../../service/authApi';
import { IProduct } from '../../types';
import { AddToCartButton } from '../rootcomponents/AddToCartButton';
import ProductLoader from '../rootcomponents/ProductLoader';
import StarIcon from '../rootcomponents/StarIcon';

const ShopProduct: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery({});
  if (isLoading)
    return (
      <div className="flex items-center ">
        <h1>loading</h1>
        <ProductLoader count={3} />
      </div>
    );
  if (error)
    return <div className="flex items-center ">Error: {error.toString()}</div>;
  const productsData =
    products.data.length > 3 ? products.data.slice(0, 3) : products.data;

  return (
    <div className="flex flex-wrap  justify-around    overflow-hidden">
      <ToastContainer />
      {productsData.map((product: IProduct) => (
        <div
          key={product.product_id}
          className="group bg-white drop-shadow-sm w-72 rounded-md transition-all ease-in-out overflow-hidden "
        >
          <div className="overflow-hidden ">
            <img
              src={product.image_url[0]}
              alt={product.name}
              className="w-full h-48 object-cover  group-hover:transition-all group-hover:ease-in-out group-hover:duration-100 "
            />
          </div>
          <div className="px-4 py-2">
            <h2 className="font-bold">{product.name}</h2>
            <h4 className="text-blue-900 font-medium py-2  transition-all ease-in-out group-hover:py-2">
              save up to $ {product.discount}
            </h4>
            <div className="flex gap-2 items-center my-2 group-hover:hidden transition-all ease-in-out">
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} color="text-yellow-500" size="w-4 h-4" />
              ))}
              <span className="text-xs">(102)</span>
            </div>
            <h2 className="font-bold py-2 group-hover:py-0">{product.price}</h2>
            <div className="hidden group-hover:flex">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProduct;
