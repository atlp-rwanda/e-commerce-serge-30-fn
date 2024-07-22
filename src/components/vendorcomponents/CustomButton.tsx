import React from 'react';

interface IconButtonProps {
  text: string;
  colorClasses: string;
  IconComponent: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
}
const CustomButton: React.FC<IconButtonProps> = ({
  text,
  colorClasses,
  IconComponent,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={`rounded flex items-center transition duration-150 ease-in-out ${colorClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      <IconComponent className="mr-2" /> {text}
    </button>
  );
};

export default CustomButton;
