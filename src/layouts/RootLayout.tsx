import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/rootcomponents/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
export const RootLayout: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
