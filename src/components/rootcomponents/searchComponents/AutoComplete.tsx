import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../slices/search.slice';
import { IProduct } from '../../../types';
interface AutoCompleteProps {
  isLoading: boolean;
  searchResults: IProduct[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AutoComplete({
  isLoading,
  searchResults,
  isOpen,
  setIsOpen,
}: AutoCompleteProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleResultSelection = (searchInput: string) => {
    setIsOpen(false);
    dispatch(setSearchTerm(searchInput));
    navigate('/shop');
  };
  return (
    <>
      {isOpen && (
        <div
          data-testid="autoComplete"
          className="z-10 absolute w-full max-h-64 mt-2 px-2 overflow-y-auto font-outfit text-neutral-600  bg-neutral-100  rounded-md custom-scrollbar"
        >
          {isLoading ? (
            <div
              data-testid="loading"
              className="flex justify-center items-center h-full"
            >
              <Oval
                color="#fafafa"
                secondaryColor="#000"
                height={20}
                width={20}
              />
            </div>
          ) : (
            searchResults.map((item) => (
              <div
                data-testid="oneResult"
                className="hover:text-black cursor-pointer"
                key={item.product_id}
                onClick={() => handleResultSelection(item.name)}
              >
                {item.name}
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
