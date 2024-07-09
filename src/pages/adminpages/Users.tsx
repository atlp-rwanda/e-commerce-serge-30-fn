import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TableBody,
  TableHeader,
} from '../../components/admincomponents/TableComponents/index';
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
const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage: number = 8;
  const { data, isLoading, error, mutate } = useFetch('/api/v1/users');
  const isAuthenticated = useSelector(
    (state: RootState) => state.user?.user?.role === "ADMIN",
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
  if (isLoading) return <Loading message="Loading users..." />;

  const filteredUsers = data.filter((users: IUser) =>
    users.firstname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastUser: number = currentPage * usersPerPage;
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
  const currentUsers: IUser[] = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages: number = Math.ceil(filteredUsers.length / usersPerPage);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <main className="w-[96%] mx-auto">
      <div className="flex justify-between my-2 mx-2 mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <main>
      <ToastContainer />
        <table className="min-w-full border bg-white">
          <TableHeader />
          <TableBody
            users={currentUsers}
            formatDate={formatDate}
            refreshUsers={refreshUsers}
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

export default Users;
