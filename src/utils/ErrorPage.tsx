import React from 'react';
import { Link } from 'react-router-dom';

export interface ErrorProps {
  message?: string;
}

export const ErrorPage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center  justify-center h-full">
      <div className="flex items-center flex-col text-red-500">
        <img src="/notfound.png" className="h-[50vh]" alt="not found" />
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <p>{message}</p>
        <Link
          to="/vendor/products"
          className="bg-blue-500 border rounded-md shadow-lg my-6 px-4 py-2 text-white"
        >
          Go back to products
        </Link>
      </div>
    </div>
  );
};
