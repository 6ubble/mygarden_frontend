import { useUser } from '../../hooks/useUser';
import { Navigate } from 'react-router-dom';
import { Loading } from '../../ui/Loading';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading, error } = useUser();

    if (isLoading) return <Loading />;
    if (error || !user) return <Navigate to="/login" replace />;

    return <>{children}</>;
};