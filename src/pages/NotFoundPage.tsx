import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-7/12 my-12">
        <img
          src={'/404.svg'}
          className="h-[60vh] w-full object-cover"
          alt="not found"
        />
      </div>

      <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
