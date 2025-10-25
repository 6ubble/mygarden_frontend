import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../entities/user/model/hooks/useUser';
import { Loading } from '../../../shared/ui/Loading';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};