import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './shared/hooks/useUser'
import { Loading } from './shared/ui/Loading'
import { Login } from './features/auth/Login'
import { Register } from './features/auth/Register'
import { Dashboard } from './pages/DashboardPage'
import { MapPage } from './pages/MapPage'
import { CalendarPage } from './pages/CalendarPage'
import { TasksPage } from './pages/TasksPage'
import { SettingsPage } from './pages/SettingsPage'
import { Header } from './layout/header/Header'
import { Footer } from './layout/footer/Footer'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 pb-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}

function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

export default function App() {
    const { data: user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    const isAuthenticated = !!user;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    )
                }
            />

            <Route
                path="/register"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <AuthLayout>
                            <Register />
                        </AuthLayout>
                    )
                }
            />

            <Route
                path="/dashboard"
                element={
                    isAuthenticated ? (
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            <Route
                path="/map"
                element={
                    isAuthenticated ? (
                        <ProtectedLayout>
                            <MapPage />
                        </ProtectedLayout>
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            <Route
                path="/calendar"
                element={
                    isAuthenticated ? (
                        <ProtectedLayout>
                            <CalendarPage />
                        </ProtectedLayout>
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            <Route
                path="/tasks"
                element={
                    isAuthenticated ? (
                        <ProtectedLayout>
                            <TasksPage />
                        </ProtectedLayout>
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            <Route
                path="/settings"
                element={
                    isAuthenticated ? (
                        <ProtectedLayout>
                            <SettingsPage />
                        </ProtectedLayout>
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}