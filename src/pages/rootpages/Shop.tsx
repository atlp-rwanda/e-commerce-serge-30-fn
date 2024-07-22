import { useEffect, useState } from 'react';
import { AllProducts } from '../../components/rootcomponents/searchComponents/AllProducts';
import { SideBarFilter } from '../../components/rootcomponents/searchComponents/sideBarFilter';
import { useGetAllProductsQuery } from '../../service/productApi';
import SkeletonProduct from '../../components/rootcomponents/skeletonProduct';
import { IProduct } from '../../types';
export default function Shop() {
  const { data, isLoading } = useGetAllProductsQuery();
  const [dataToDisplay, setDataToDisplay] = useState<IProduct[]>([]);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const getLoading = (loading: boolean) => {
    setLoading(loading);
  };
  const filteredData = (data: IProduct[]) => {
    setDataToDisplay(data);
    setIsError(false);
  };
  const getError = (error: string) => {
    setIsError(true);
    setError(error);
  };
  useEffect(() => {
    if (!isLoading && data) {
      setDataToDisplay(data.data);
      setIsError(false);
    }
  }, [isLoading, data]);
  return (
    <div>
      <div className="flex bg-[#fafafa] max-md:flex-col">
        <SideBarFilter
          filteredData={filteredData}
          getError={getError}
          getLoading={getLoading}
        />
        {isLoading || loading ? (
          <SkeletonProduct />
        ) : isError ? (
          <h1 className="text-red-700 self-center ml-72 text-2xl max-md:m-20">
            {error}
          </h1>
        ) : (
          <AllProducts products={dataToDisplay} />
        )}
      </div>
    </div>
  );
}
