import { useState } from 'react';
import { useGetAllProductsQuery } from '../../../service/productApi';
import { IProduct } from '../../../types';
import { useNavigate } from 'react-router-dom';
import AutoComplete from './AutoComplete';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../slices/search.slice';

export default function SearchBar({ menuActive }: { menuActive: boolean }) {
  const { data, isLoading } = useGetAllProductsQuery();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchData = (value: string) => {
    if (!data) {
      return;
    }
    const productArr = data.data;
    const filteredData = productArr.filter(
      (item) =>
        value &&
        item &&
        item.name &&
        item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchResults(filteredData);
  };

  const handleInput = (value: string) => {
    setIsOpen(true);
    setSearchInput(value);
    fetchData(value);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      return;
    }
    setIsOpen(false);
    dispatch(setSearchTerm(searchInput));
    navigate('/shop');
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div
          className={`flex items-center border border-slate-400 rounded-md ${menuActive && 'max-tablet:hidden'}`}
        >
          <input
            type="search"
            name=""
            id="searchInput"
            placeholder="Search Product"
            className="p-2 text-sm placeholder:text-sm outline-none"
            value={searchInput}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={() => handleSearch()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {isOpen && (
          <AutoComplete
            isLoading={isLoading}
            searchResults={searchResults}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}
