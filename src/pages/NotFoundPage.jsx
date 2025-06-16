import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md">
        <div className="flex justify-center mb-4 text-yellow-500">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          If you think this is a mistake, please contact support.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Go back to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
