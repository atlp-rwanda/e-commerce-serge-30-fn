import React, { useState } from 'react';
import { Button } from '../../components/rootcomponents/Button';
import { useAddReviewMutation } from '../../service/productApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reviewSchema } from '../../utils/validations/reviews.validation';
import { Review } from './reviews';
import { ZodError } from 'zod';

interface AddReviewProps {
  onReviewAdded: (newReview: Review) => void;
  hasReviews: boolean;
}
interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

export const AddReview: React.FC<AddReviewProps> = ({
  onReviewAdded,
  hasReviews,
}) => {
  const { productId } = useParams<{ productId: string }>();
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [reviewContent, setReviewContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem('token');
    event.preventDefault();

    try {
      reviewSchema.parse({
        reviewTitle,
        reviewContent,
        rating,
      });

      const response = await addReview({
        product_id: productId,
        token: token,
        review: {
          title: reviewTitle,
          comment: reviewContent,
          rating: rating,
        },
      });

      if (response.data && response.data.success) {
        const newReview = response.data.review;
        onReviewAdded(newReview);
        toast.success('Review added successfully!', {
          toastId: 'success-toast',
        });
        setReviewTitle('');
        setReviewContent('');
        setRating(0);

        if (!hasReviews) {
          window.location.reload();
        }
      } else {
        let errorMessage = 'Failed to add review';
        const error = response.error;
        if (error && typeof error === 'object' && 'data' in error) {
          const err = error as ErrorResponse;
          if (err.data?.message) {
            errorMessage = err.data.message;
          }
        }
        toast.error(errorMessage);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
        console.error('Validation failed:', error);
      } else {
        console.error('Failed to add review:', error);
        toast.error('Failed to add review');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="flex items-center justify-center mb-4">
        <p className="text-xl font-semibold">Write a review</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reviewTitle"
          >
            Review Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reviewTitle"
            type="text"
            placeholder="Enter review title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reviewContent"
          >
            Review
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reviewContent"
            placeholder="Write your review..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            className="bg-black text-white font-bold py-2 px-6 rounded-sm focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoading ? 'Adding Review...' : 'Add Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};
