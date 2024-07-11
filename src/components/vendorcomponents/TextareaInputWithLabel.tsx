import React from 'react';

interface TextareaInputProps {
    label: string;
    register: any;
    name: string;
}

export const TextareaInputWithLabel: React.FC<TextareaInputProps> = ({
    label,
    register,
    name,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
            {...register(name)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
        />
    </div>
);
