import React from 'react';

/**
 * Reusable Label component.
 * @param {Object} props - Component props.
 * @param {string} props.htmlFor - The ID of the input element this label is associated with.
 * @param {React.ReactNode} props.children - The text or elements to display inside the label.
 * @param {string} [props.className] - Additional CSS classes for the label.
 * @returns {JSX.Element} Label element with styles.
 */
interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 text-sm font-bold mb-2 ${className}`}
    >
      {children}
    </label>
  );
};
