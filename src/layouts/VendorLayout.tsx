import { Outlet, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../service/authApi';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setToken, setUser } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
export const VendorLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token') || null;
  const user = searchParams.get('user') || null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (token != null) {
      localStorage.setItem('token', token);
      dispatch(setToken(token));
    }

    if (user != null) {
      const decodedUser = decodeURIComponent(user);
      const userObject = JSON.parse(decodedUser);

      dispatch(setUser(userObject));
    }
    setSearchParams({});
    window.history.replaceState({}, '', window.location.pathname);
  }, [token, user, dispatch]);
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
