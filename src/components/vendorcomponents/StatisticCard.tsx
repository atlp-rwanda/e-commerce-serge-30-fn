interface StatisticCardProps {
  title: string;
  value: string | number;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
}) => {
  return (
    <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg flex items-center justify-between">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <p className="text-2xl md:text-4xl font-bold text-gray-800">
          {value ?? 'N/A'}
        </p>
      </div>
    </div>
  );
};
