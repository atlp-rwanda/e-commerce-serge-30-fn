import { reviews } from '../../data/ReviewData';
import ReviewCard from './ReviewCard'; // Adjust the import path

const HomeReviews = () => {
  return (
    <div className="flex gap-6 justify-between max-tablet:flex-wrap max-tablet:items-center py-4">
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          name={review.name}
          review={review.review}
          rating={review.rating}
        />
      ))}
    </div>
  );
};

export default HomeReviews;
