import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../utils/Loading';
import { useGetProductReviewsMutation } from '../../service/productApi';
import { useUserDataByIdMutation } from '../../service/authApi';
import { AddReview } from '../../components/usercomponents/AddReview';
import StarIcon from '../../components/rootcomponents/StarIcon';

export interface Review {
  id: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  userId: string;
  username?: string;
}

export const ProductReviews: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [getProductReviews, { isLoading: isLoadingReviews }] =
    useGetProductReviewsMutation();
  const [userDataById] = useUserDataByIdMutation();

  const fetchUsername = async (userId: string, token: string) => {
    try {
      const response = await userDataById({ id: userId, token }).unwrap();
      return response.username;
    } catch (error) {
      console.error(`Failed to load user data for userId ${userId}:`, error);
      return 'User';
    }
  };

  const fetchReviews = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getProductReviews({
        product_id: productId,
        token,
      }).unwrap();
      const reviewsData: Review[] = response.allReviews;

      // Fetch usernames for each review
      if (token) {
        const reviewsWithUsernames = await Promise.all(
          reviewsData.map(async (review) => {
            const username = await fetchUsername(review.userId, token);
            return { ...review, username };
          }),
        );

        setReviews(reviewsWithUsernames);
      }
    } catch (error: any) {
      console.error('Failed to load product reviews:', error);
      setError(error.data.message);
    }
  };

  const handleReviewAdded = async (newReview: Review) => {
    const token = localStorage.getItem('token');
    if (token) {
      const username = await fetchUsername(newReview.userId, token);
      setReviews((prevReviews) => [...prevReviews, { ...newReview, username }]);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId, getProductReviews]);

  if (isLoadingReviews)
    return (
      <div className="my-6">
        <Loading message="Loading Reviews..." />
      </div>
    );

  return (
    <>
      {error ? (
        <div className="my-6 flex items-center justify-center">
          No reviews left yet
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 m-12">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex items-center">
                <div>
                  <img
                    src={`https://i.pravatar.cc/150?u=${review.userId}`}
                    alt={review.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <p className="mt-2 text-center px-4 text-sm">
                    {review.username}
                  </p>
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm pl-2 text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        color={
                          index < review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                        size="h-5 w-5"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-950 py-2">
                    {review.title}
                  </p>
                  <p className="mt-2">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddReview onReviewAdded={handleReviewAdded} hasReviews={reviews.length > 0} />
    </>
  );
};
