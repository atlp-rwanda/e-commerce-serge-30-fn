import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar } from '../components/admincomponents/index';
import { useState } from 'react';
export const AdminLayout: React.FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <main className="h-screen flex">
      <Sidebar menuActive={menuActive} />
      <section className="flex-1 flex flex-col">
        <Navbar onClick={handleMenu} />
        <Outlet />
      </section>
    </main>
  );
};
