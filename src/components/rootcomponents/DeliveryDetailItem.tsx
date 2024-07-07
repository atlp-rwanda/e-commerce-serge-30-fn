interface DeliveryDetailItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string; // Optional link text
}

const DeliveryDetailItem: React.FC<DeliveryDetailItemProps> = ({
  icon,
  title,
  description,
  linkText,
}) => {
  return (
    <div className="flex border flex-col">
      <div className="flex flex-row items-center px-6 py-4 gap-x-6">
        <p className="text-3xl">{icon}</p>
        <div>
          <p>{title}</p>
          <p>
            {description}{' '}
            {linkText && <span className="underline">{linkText}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailItem;
