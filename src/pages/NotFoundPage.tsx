import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Back to Home
            </Link>
        </div>
    );
}

 
