import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Page not found</h2>
        <p className="mt-6 text-base leading-7 text-gray-600">
          The page you are looking for doesn't exist or has been removed.
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/">
            <Button variant="default">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;