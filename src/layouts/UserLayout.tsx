import { Outlet, useNavigate } from 'react-router-dom';
import * as rootcomponents from '../components/index';
import { sidebarLinks } from '../../src/data/index';

import UserNavbar from '../components/usercomponents/UserNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
export const UserLayout: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);
  return (
    <main className="h-screen flex flex-col tablet:flex-row font-[outfit] overflow-hidden">
      <aside>
        <rootcomponents.Sidebar userLinks={sidebarLinks} />
      </aside>
      <section className="flex-1 flex flex-col bg-zinc-50">
        <UserNavbar />
        <main className="flex-1 overflow-y-auto pb-3 ">
          <Outlet />
        </main>
      </section>
    </main>
  );
};
