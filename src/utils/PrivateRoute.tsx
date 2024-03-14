import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import checkAuthentication from '@/api/checkAuthentication';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function PrivateRoute({ isRequiredAuthentication }: { isRequiredAuthentication: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      const authResult = await checkAuthentication();
      setIsAuthenticated(authResult);
      setIsLoading(false);
    };

    authenticate();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center mt-32'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isRequiredAuthentication) {
    return isAuthenticated ? <Outlet /> : <Navigate to='/etermarket/' />;
  } else if (!isRequiredAuthentication) {
    return isAuthenticated ? <Navigate to='/etermarket/' /> : <Outlet />;
  }
}
