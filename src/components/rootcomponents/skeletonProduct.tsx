import { ProductCardSkeleton } from './productCardSkeleton';

const SkeletonProduct = () => {
  return (
    <div className="bg-white drop-shadow-sm w-full rounded-md animate-pulse p-4">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
};

export default SkeletonProduct;
