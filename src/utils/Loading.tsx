import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center">
        <FaSpinner
          data-testid="loading-spinner"
          className="animate-spin delay-150 duration-150  text-blue-500 mr-2"
        />
        <p>{message}</p>
      </div>
    </div>
  );
};
