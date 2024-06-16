import React from 'react';

/**
 * Button component with customizable styles and click handler.
 * @param {Object} props - Component props.
 * @param {Function} props.onClick - Click handler function.
 * @param {React.ReactNode} props.children - Child elements to render inside the button.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @param {string} [props.type] - Type of the button.
 * @returns {JSX.Element} Button element with specified functionality.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  type = 'button',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-black hover:bg-blue-700 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
