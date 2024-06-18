import StarIcon from '../../components/rootcomponents/StarIcon';
interface ReviewProps {
  name: string;
  review: string;
  rating: number;
}
const ReviewCard = ({ name, review, rating }: ReviewProps) => {
  return (
    <div className="my-2 rounded-md bg-white w-72 max-tablet:w-60 p-4 drop-shadow-md">
      <p className="text-slate-300">{name}</p>
      <div className="flex my-2">
        {Array.from({ length: rating }, (_, index) => (
          <StarIcon key={index} color="text-yellow-500 " size="w-4 h-4" />
        ))}
      </div>
      <p className="text-xs">{review}</p>
    </div>
  );
};

export default ReviewCard;
