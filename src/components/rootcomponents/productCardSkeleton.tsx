export const ProductCardSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-48 bg-neutral-200 mb-4" />
        ))}
      </div>
    </div>
  );
};
