import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/vendorcomponents/Sidebar';
import Navbar from '../components/vendorcomponents/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';

export const VendorLayout: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  //use effect hook if !isAuthenticated navigate to login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="h-screen flex overflow-hidden">
      <aside>
        <Sidebar />
      </aside>
      <section className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-3">
          <Outlet />
        </main>
      </section>
    </main>
  );
};