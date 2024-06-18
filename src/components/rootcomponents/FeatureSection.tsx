import { features } from '../../data/index';
import FeatureCard from './FeatureCard';

export const FeaturesSection = () => {
  return (
    <div className="flex justify-between max-tablet:flex-wrap">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          image={feature.image}
          altText={feature.altText}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
