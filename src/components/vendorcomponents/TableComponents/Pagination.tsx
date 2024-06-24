// components/Pagination.tsx
import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (_pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => (
  <div className="flex justify-end items-center mt-4">
    <nav className="flex items-center space-x-2">
      <button
        className={`p-1 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-600'}`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`p-1 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 hover:text-gray-600'}`}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`p-1 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-600'}`}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </nav>
  </div>
);
