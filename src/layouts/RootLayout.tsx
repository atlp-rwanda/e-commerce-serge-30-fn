import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import NavBar from '../components/rootcomponents/NavBar';
export const RootLayout: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
