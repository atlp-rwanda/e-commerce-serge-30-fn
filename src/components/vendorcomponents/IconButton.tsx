import React from 'react';

interface IconButtonProps {
  text: string;
  colorClasses: string;
  IconComponent: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton: React.FC<IconButtonProps> = ({
  text,
  colorClasses,
  IconComponent,
  onClick,
  disabled,
  type = 'button',
}) => {
  return (
    <button
      className={`rounded flex items-center transition duration-150 ease-in-out ${colorClasses}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <IconComponent className="mr-2" /> {text}
    </button>
  );
};
