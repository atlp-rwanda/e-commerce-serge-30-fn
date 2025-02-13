import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useFetch from '../../hooks/useFetch';
import { IProduct } from '../../types';
import { Loading } from '../../utils/Loading';
import { ErrorPage } from '../../utils/ErrorPage';
import { ActionButton } from '../../components/vendorcomponents/ActionButton';
import {
  Pagination,
  SearchBar,
  TableHeader,
  TableBody,
} from '../../components/vendorcomponents/TableComponents';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 8;
  const { data, isLoading, error } = useFetch('/api/v1/products/all');

  const user = useSelector((state: RootState) => state.user.user);

  if (error) return <ErrorPage message="Error while connecting to server" />;
  if (isLoading) return <Loading message="Loading products..." />;

  const filteredProducts: IProduct[] = data.data.filter((product: IProduct) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: IProduct[] = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages: number = Math.ceil(
    filteredProducts.length / productsPerPage,
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAddProduct = () => {
    if (user && user.role === 'VENDOR') {
      navigate('/vendor/products/new');
    } else {
      toast.error('You are not allowed to create a new product.');
    }
  };

  return (
    <main className="w-[96%] mx-auto">
      <div className="flex justify-between my-2 mx-2 mb-4">
        <h1 className="text-2xl font-bold">Product</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ActionButton
          text="Add product"
          colorClasses="bg-slate-800 text-white px-6 py-2"
          IconComponent={FaPlus}
          onClick={handleAddProduct}
        />
      </div>
      <main>
        <table className="min-w-full border bg-white">
          <TableHeader />
          <TableBody products={currentProducts} formatDate={formatDate} />
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </main>
      <ToastContainer />
    </main>
  );
};

export default Product;
