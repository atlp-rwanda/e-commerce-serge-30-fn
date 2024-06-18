import { Outlet, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../service/authApi';
export const VendorLayout: React.FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <main className="h-screen">
      <aside>sidebar vendor</aside>
      {isLoading ? (
        <button>Loading..</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <section>
        <nav>navbar vendor</nav>
        <Outlet />
      </section>
    </main>
  );
};
