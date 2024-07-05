import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../service/authApi';
import { RootState } from '../../redux/store';
import { setAuthentication } from '../../redux/features/auth/authSlice';
import { useEffect } from 'react';
interface MenuLinkProp {
  className?: string;
}
const MenuLinks = ({ className }: MenuLinkProp) => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  useEffect(() => {}, [isAuthenticated]);
  const handleLogout = async () => {
    try {
      await logout({});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(setAuthentication(false));
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <div className={className}>
      {' '}
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link to="/new" className="hover:underline">
        New
      </Link>
      <Link to="/shop" className="hover:underline">
        Shop
      </Link>
      {isAuthenticated ? (
        <Link to="/" className="hover:underline" onClick={handleLogout}>
          Sign Out
        </Link>
      ) : (
        <Link to="/auth/login" className="hover:underline">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default MenuLinks;
