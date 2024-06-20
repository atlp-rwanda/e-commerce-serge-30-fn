import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/rootcomponents/Header';

export const RootLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
