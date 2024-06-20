import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </div>
        <Link
          to="/auth/login"
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};
