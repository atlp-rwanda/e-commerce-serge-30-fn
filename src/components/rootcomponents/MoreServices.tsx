import { services } from '../../data/ServiceData';

const MoreServices = () => {
  return (
    <div className="flex justify-around items-center m-12 font-outfit max-tablet:flex-wrap max-tablet:m-4 max-tablet:gap-12">
      {services.map((feature, index) => (
        <div key={index} className="flex items-center flex-col gap-4">
          <img src={feature.icon} alt={feature.altText} className="w-20" />
          <h1 className="font-bold">{feature.title}</h1>
          <p className="text-xs">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MoreServices;
