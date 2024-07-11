import { Link } from 'react-router-dom';
import notFoundImage from '../assets/404image.png';
import Footer from '../components/rootcomponents/Footer';

export function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 relative">
        <h1 className="text-4xl font-semibold absolute top-5">
          404 - Page Not Found
        </h1>
        <img src={notFoundImage} />
        <Link
          to="/"
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
