import React from 'react';
/**
 * Reusable Input component with label.
 * @param {Object} props - Component props.
 * @param {string} props.label - Label for the input field.
 * @param {string} props.id - ID for the input field.
 * @param {string} props.type - Type of the input field (e.g., text, password).
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string} props.value - Current value of the input field.
 * @param {Function} props.onChange - Change handler for the input field.
 * @param {string} [props.className] - Additional CSS classes for the input container.
 * @returns {JSX.Element} Input element with label and styles.
 */
interface InputProps {
  type?: string;
  name?: string;
  title?: string;
  placeholder?: string;
  value?: string;
  borderColor?: string;
  className?: string;
  className1?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  title,
  placeholder,
  value,
  className,
  className1,
  onChange,
}) => {
  return (
    <div className={`mb-4 ${className1}`}>
      <input
        className={`shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        id={id}
        type={type}
        name={name}
        title={title}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
      />
    </div>
  );
};
