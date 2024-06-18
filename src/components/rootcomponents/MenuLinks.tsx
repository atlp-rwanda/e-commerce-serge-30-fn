import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../service/authApi';
interface MenuLinkProp {
  className?: string;
  isAuthenticated?: boolean;
}
const MenuLinks = ({ className, isAuthenticated }: MenuLinkProp) => {
  const [logout] = useLogoutMutation();
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
