import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  useSearchProductsMutation,
  useGetAllCategoriesQuery,
} from '../../../service/productApi';
import { Button } from '../Button';
import { FunnelSimple } from '@phosphor-icons/react';
import { IProduct } from '../../../types';
import { useSelector } from 'react-redux';
import { SearchState, setSearchTerm } from '../../../slices/search.slice';
import { useDispatch } from 'react-redux';
import { Puff } from 'react-loader-spinner';

interface SideBarProps {
  filteredData: (data: IProduct[]) => void;
  getError: (error: string) => void;
}

export const SideBarFilter: React.FC<SideBarProps> = ({
  filteredData,
  getError,
}) => {
  const [currentCategory, setCategory] = useState('');
  const [price, setPrice] = useState<number[]>([0, 90000]);
  const [
    searchProducts,
    { data, isLoading, error: errorSearch, isError: isErrorSearch },
  ] = useSearchProductsMutation();
  const [showFilter, setShowFilter] = useState(true);
  const { data: categoriesData, isError } = useGetAllCategoriesQuery();
  const categories = categoriesData?.data || [];
  const errorMessage = (errorSearch as any)?.data?.message || 'network Error';
  const searchTerm = useSelector(
    (state: { search: SearchState }) => state.search.searchTerm,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && data) {
      filteredData(data);
    }
    if (isErrorSearch) {
      getError(errorMessage);
    }
  }, [isLoading, data, errorSearch]);

  const handleFilter = (
    searchTerm: string,
    category: string,
    price: number[],
  ) => {
    searchProducts({
      name: searchTerm,
      category,
      minPrice: price[0],
      maxPrice: price[1],
    });
  };
  const handleClear = () => {
    dispatch(setSearchTerm(''));
    setCategory('');
    setPrice([0, 90000]);
  };

  useEffect(() => {
    handleFilter(searchTerm, currentCategory, price);
  }, [searchTerm, currentCategory, price]);

  return (
    <div className="bg-white max-h-96 w-1/5 rounded-md border-x border-neutral-300 flex flex-col p-4 justify-center sticky top-20 max-sm:w-full max-sm:absolute max-sm:z-2">
      <Button
        className="absolute -top-16 right-12 md:hidden bg-transparent hover:bg-transparent"
        onClick={() => setShowFilter(!showFilter)}
      >
        <FunnelSimple size={20} />
      </Button>
      {showFilter && (
        <div className="flex flex-col items-center mb-10 tracking-wide font-light">
          <p className="font-bold mt-7 text-neutral-500">Categories</p>
          <div className="flex flex-col justify-center gap-3 h-64 overflow-y-auto custom-scrollbar">
            {isError && (
              <h1 className="text-red-500 text-xl">Network Error </h1>
            )}
            {isLoading && <Puff height={30} width={30} color="black" />}
            {categories.map((category) => (
              <div key={category.name} className="flex gap-5">
                <input
                  type="radio"
                  value={category.name}
                  checked={category.name === currentCategory}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
          </div>

          <div className="w-full justify-self-end">
            <p className="font-bold self-center">Price</p>
            <Slider
              range
              value={price}
              min={0}
              max={90000}
              step={500}
              onChange={(newPrice) => setPrice(newPrice as number[])}
              trackStyle={{ backgroundColor: 'gray' }}
              handleStyle={{ borderColor: 'gray', backgroundColor: 'black' }}
            />
            <div className="flex text-xs justify-between font-semibold gap-1 w-full">
              <h1>{price[0]}</h1>
              <h1>{price[1]}</h1>
            </div>
          </div>
          <Button
            className="text-white mt-auto w-full"
            onClick={() => handleClear()}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};
