import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mt-6 text-base text-gray-600 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. Either it doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
          >
            Go Back
          </Button>
          <Link to="/">
            <Button>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;