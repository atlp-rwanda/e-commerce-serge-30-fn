import React, { forwardRef } from 'react';

interface InputProps {
  type?: string;
  name?: string;
  title?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  className1?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  borderColor?: string;
}

// Use React.forwardRef to forward the ref to the input element
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  name,
  title,
  placeholder,
  value,
  className1,
  id,
  onChange,
  className = '',
  
  borderColor = 'border-gray-300',
}, ref) => {
  return (
    <div className={`mb-4 ${ className1}`}>
      <input
        ref={ref}
        type={type}
        name={name}
        title={title}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`rounded w-full py-2 px-4 text-gray-700 shadow-sm focus:outline-none focus:shadow-outline ${borderColor} ${className}`}
      />
    </div>
  );
});
export default Input;
