import React, { useEffect, useState } from 'react';
import { useGetProductByIdMutation } from '../../service/productApi';
import { Loading } from '../../utils/Loading';
import { useParams } from 'react-router-dom';
import StarIcon from './StarIcon';
import { CiHeart } from 'react-icons/ci';
import { ToastContainer, toast } from 'react-toastify';
import Deliverydetails from './DeliveryDetails';
import { ProductReviews } from '../../components/usercomponents/reviews';
import Footer from '../../components/rootcomponents/Footer';
import { Button } from '../../components/rootcomponents/Button';
import { AddToCartButton } from './AddToCartButton';
import { RecommendedProducts } from './RecommendedProducts';
import { IProduct } from '../../types';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [getProductById, { isLoading }] = useGetProductByIdMutation();

  const fetchProduct = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getProductById({
        product_id: productId,
        token,
      }).unwrap();
      const productData = response.data;
      setProduct(productData);
    } catch (error) {
      console.error('Failed to load product:', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, getProductById]);

  const handleUpdateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }
    setQuantity(newQuantity);
  };

  const increaseQuantity = () => handleUpdateQuantity(1);
  const decreaseQuantity = () => handleUpdateQuantity(-1);

  if (isLoading)
    return (
      <div className="mt-12">
        <Loading message="Loading Product..." />
      </div>
    );
  if (!product)
    return (
      <div className="flex items-center justify-center mt-12">
        An error Occured, Try again
      </div>
    );

  return (
    <>
      <div>
        <ToastContainer />
        <div className="flex mx-12 my-12 gap-x-6">
          <div className="flex-1 gap-x-4 overflow-hidden">
            <div className="flex gap-x-8">
              <div className="w-fit flex flex-col items-center justify-center py-2 gap-y-4">
                {product.image_url.slice(1, 4).map((url, index) => (
                  <div key={index} className="h-fit w-24">
                    <img src={url} alt={`${product.name} Image ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="w-3/4">
                <img
                  src={product.image_url[0]}
                  alt={`${product.name} Image 4`}
                  className="h-120 w-120"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 mr-12">
            <div className="flex flex-col pl-12">
              <p className="text-xl font-semibold">
                {product.name.toLocaleUpperCase()}
              </p>
              <div className="flex gap-0 items-center my-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon
                    key={index}
                    color={
                      index < Math.round(product.finalRatings)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }
                    size="w-4 h-4"
                  />
                ))}
                <span className="text-sm pl-2">
                  {product.reviewsCount !== undefined &&
                  product.reviewsCount > 0
                    ? `(${product.reviewsCount}) ${product.reviewsCount === 1 ? 'review' : 'reviews'}`
                    : 'No reviews yet'}
                </span>
                <span className="text-sm pl-2 text-cyan-400">| In stock</span>
              </div>
              <p className="pt-2">${product.price}</p>
              <p className="py-2 border-b">{product.description}</p>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Button
                    className="px-3 py-1 bg-gray-200 hover:text-white rounded-lg"
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-100 rounded-lg">
                    {quantity}
                  </span>
                  <Button
                    className="px-3 text-white py-1 bg-black rounded-lg"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>

                <div className="flex gap-4">
                  <AddToCartButton
                    product={product}
                    hidden={false}
                    quantity={quantity}
                  />
                  <Button className="flex items-center gap-2 px-4 py-2 border bg-white text-gray-900 hover:text-white rounded-lg">
                    <CiHeart className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <Deliverydetails />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <p className="text-xl font-semibold">What other customers say</p>
        </div>

        <ProductReviews />

        <div className="flex items-center justify-center mt-12 mb-6">
          <p className="text-xl font-semibold">Recommended Products</p>
        </div>

        <RecommendedProducts />
      </div>
      <Footer />
    </>
  );
};
