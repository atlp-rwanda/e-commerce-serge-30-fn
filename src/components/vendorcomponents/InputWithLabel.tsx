import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register: UseFormRegister<any>;
    name: string;
    inputClassName?: string;
    labelClassName?: string;
    containerClassName?: string;

}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
    label,
    register,
    name,
    inputClassName,
    labelClassName,
    containerClassName,
    ...inputProps
}) => (
    <div className={containerClassName}>
        <label className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>{label}</label>
        <input
            {...register(name)}
            {...inputProps}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 ${inputClassName}`}
        />
    </div>
);
