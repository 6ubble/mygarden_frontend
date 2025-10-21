import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './shared/hooks/useUser'
import { AuthGuard } from './shared/lib/auth/AuthGuard'
import { Loading } from './shared/ui/Loading'
import { Login } from './features/auth/Login'
import { Register } from './features/auth/Register'
import { Account } from './features/account/Account'

export default function App() {
    const { data: user, isLoading } = useUser();

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <Loading />
        </div>
    );

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            
            <Route path="/" element={
                <AuthGuard>
                    <Account />
                </AuthGuard>
            } />
        </Routes>
    );
}