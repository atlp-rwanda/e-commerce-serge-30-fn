import React from 'react';

interface FeatureCardProps {
  image: string;
  altText: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  altText,
  description,
}) => {
  return (
    <div className="rounded-md p-4 pb-12 w-80 max-tablet:w-60 my-10 drop-shadow-md bg-white">
      <img src={image} alt={altText} className="w-10" />
      <p className="pt-4" dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};

export default FeatureCard;
