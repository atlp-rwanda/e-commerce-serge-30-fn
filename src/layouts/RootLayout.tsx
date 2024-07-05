import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/rootcomponents/NavBar';
export const RootLayout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
