import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black hover:bg-gray-500 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mb-2 w-full rounded-lg tracking-wider font-light py-2.5 text-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
