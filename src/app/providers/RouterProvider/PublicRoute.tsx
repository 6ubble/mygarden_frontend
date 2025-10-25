import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../entities/user/model/hooks/useUser';
import { Loading } from '../../../shared/ui/Loading';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};