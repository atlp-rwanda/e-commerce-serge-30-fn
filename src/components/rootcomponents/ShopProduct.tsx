import React, { useState, useEffect } from 'react';
import StarIcon from './StarIcon';
import { useGetAllProductsQuery } from '../../service/authApi';
import { IProduct } from '../../types';
import { ToastContainer } from 'react-toastify';
import ProductLoader from './ProductLoader';
import { AddToCartButton } from './AddToCartButton';
import { Link } from 'react-router-dom';
import * as components from '../index';
import { useToken } from '../../hooks/useToken';
import { useGetWishlistMutation } from '../../service/productApi';

const ShopProduct: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery({});

  const [getWishlist] = useGetWishlistMutation();
  const [wishlistData, setWishlistData] = useState<any>(null);
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      getWishlist(token).then((response) => {
        setWishlistData(response.data.wishlist);
      });
    }
  }, [getWishlist, token, wishlistData]);

  if (isLoading)
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
    <div className="flex flex-wrap gap-8 justify-center px-8 py-12 h-[748px] overflow-hidden">
      <ToastContainer />
      {productsData.map((product: IProduct) => {
        const isInWishlist: boolean = wishlistData?.some(
          (item: any) => item.product_id === product.product_id,
        );
        return (
          <div
            key={product.product_id}
            className="group relative bg-white drop-shadow-sm w-72 rounded-md transition-all ease-in-out overflow-hidden"
          >
            <components.AddToWishlist
              productId={product.product_id}
              isInWishlist={isInWishlist}
            />
            <div className="overflow-hidden">
              <img
                src={product.image_url[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-100"
              />
            </div>
            <div className="px-4 py-2">
              <Link to={`/product/${product.product_id}`}>
                <h2 className="font-bold">{product.name}</h2>
              </Link>
              <h4 className="text-blue-900 font-medium py-2 transition-all ease-in-out group-hover:py-2">
                save up to $102
              </h4>
              <div className="flex gap-2 items-center my-2 group-hover:hidden transition-all ease-in-out">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon
                    key={index}
                    color="text-yellow-500"
                    size="w-4 h-4"
                  />
                ))}
                <span className="text-xs">(102)</span>
              </div>
              <h2 className="font-bold py-2 group-hover:py-0">
                {product.price}
              </h2>
              <AddToCartButton product={product} hidden={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShopProduct;
