import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useRecommendedProductsMutation } from '../../service/productApi';
import { IProduct } from '../../types/Product.types';
import { Loading } from '../../utils/Loading';
import { AddToCartButton } from './AddToCartButton';
import StarIcon from './StarIcon';
import { Link } from 'react-router-dom';

export const RecommendedProducts: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [getRecommendedProducts, { isLoading: isLoadingRecommendations }] =
    useRecommendedProductsMutation();
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    [],
  );

  const fetchRecommendedProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getRecommendedProducts({
        token,
        product_id: productId,
      }).unwrap();

      setRecommendedProducts(response.data);

      console.log(response.data);
    } catch (error: any) {
      console.error('Failed to load product reviews:', error);
    }
  };

  useEffect(() => {
    fetchRecommendedProducts();
  }, [productId, getRecommendedProducts]);

  if (isLoadingRecommendations)
    return (
      <div className="my-6">
        <Loading message="Loading Recommended Prodcuts..." />
      </div>
    );

  return (
    <div
      data-testid="recommendedProducts"
      className="w-full h-screen flex flex-col items-center gap-2"
    >
      {recommendedProducts.length === 0 ? (
        <h1 className="font-outfit text-6xl font-thin text-center">
          No Products found
        </h1>
      ) : (
        <div
          data-testid="container"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {recommendedProducts.map((product) => (
            <div
              key={product.product_id}
              className="group bg-white drop-shadow-sm rounded-md transition-all ease-in-out overflow-hidden"
              style={{ maxWidth: '18rem' }}
            >
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
                  Save up to $ {product.discount}
                </h4>
                <div className="flex gap-2 items-center my-2 group-hover:hidden transition-all ease-in-out">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      color="text-yellow-500"
                      size="w-4 h-4"
                    />
                  ))}
                  <span className="text-xs">({product.reviewsCount})</span>
                </div>
                <h2 className="font-bold py-2 group-hover:py-0">
                  ${product.price}
                </h2>
                <AddToCartButton product={product} hidden={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
