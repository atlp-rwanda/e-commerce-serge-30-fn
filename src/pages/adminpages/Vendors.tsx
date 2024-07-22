import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Pagination,
  SearchBar,
} from '../../components/vendorcomponents/TableComponents';
import useFetch from '../../hooks/useFetch';
import { RootState } from '../../redux/store';
import { IUser } from '../../types';
import { ErrorPage } from '../../utils/ErrorPage';
import { Loading } from '../../utils/Loading';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Vendors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage: number = 8;
  const { data, isLoading, error, mutate } = useFetch('/api/v1/users');
  const isAuthenticated = useSelector(
    (state: RootState) => state.user?.user?.role === 'ADMIN',
  );
  const navigate = useNavigate();

  const refreshUsers = () => {
    mutate();
  };

  useEffect(() => {
    refreshUsers();
  }, [data]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, []);

  if (error) return <ErrorPage message="Error while connecting to server" />;
  if (isLoading) return <Loading message="Loading vendors..." />;

  // Ensure data is an array before filtering
  const vendors = Array.isArray(data) 
    ? data.filter((user: IUser) => user.role === 'VENDOR')
    : [];

  const filteredVendors = vendors.filter((vendor: IUser) =>
    vendor.firstname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastVendor: number = currentPage * usersPerPage;
  const indexOfFirstVendor: number = indexOfLastVendor - usersPerPage;
  const currentVendors: IUser[] = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages: number = Math.ceil(filteredVendors.length / usersPerPage);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const CustomTableHeader: React.FC = () => (
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Name</th>
        <th className="py-3 px-6 text-left">Email</th>
        <th className="py-3 px-6 text-center">Joined Date</th>
      </tr>
    </thead>
  );

  const CustomTableBody: React.FC<{
    users: IUser[];
    formatDate: (date: string) => string;
  }> = ({ users, formatDate }) => (
    <tbody className="text-gray-600 text-sm font-light">
      {users.map((user) => (
        <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">{`${user.firstname} ${user.lastname}`}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>{user.email}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <span>{formatDate(user.createdAt.toString())}</span>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <main className="w-[96%] mx-auto">
      <div className="flex justify-between my-2 mx-2 mb-4">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <main>
        <ToastContainer />
        <table className="min-w-full border bg-white">
          <CustomTableHeader />
          <CustomTableBody
            users={currentVendors}
            formatDate={formatDate}
          />
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </main>
    </main>
  );
};

export default Vendors;