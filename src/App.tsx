import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './shared/hooks/useUser'
import { Loading } from './shared/ui/Loading'
import { Login } from './features/auth/Login'
import { Register } from './features/auth/Register'
import { Account } from './pages/Account'
import { MapPage } from './pages/MapPage'
import { CalendarPage } from './pages/CalendarPage'
import { TasksPage } from './pages/TasksPage'
import { SettingsPage } from './pages/SettingsPage'
import { Header } from './layout/Header/Header'
import { Footer } from './layout/Footer/Footer'

function AppLayout({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-1 pt-16 ${isAuthenticated ? 'pb-20' : ''}`}>
                {children}
            </main>
            {isAuthenticated && <Footer />}
        </div>
    )
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
        <AppLayout isAuthenticated={isAuthenticated}>
            <Routes>
                {/* Главная = Login */}
                <Route 
                    path="/" 
                    element={<Login />} 
                />

                {/* Регистр */}
                <Route 
                    path="/register" 
                    element={<Register />} 
                />

                {/* Dashboard (только авторизованные) */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Account />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Карта (только авторизованные) */}
                <Route
                    path="/map"
                    element={
                        isAuthenticated ? (
                            <MapPage />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Календарь (только авторизованные) */}
                <Route
                    path="/calendar"
                    element={
                        isAuthenticated ? (
                            <CalendarPage />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Задачи (только авторизованные) */}
                <Route
                    path="/tasks"
                    element={
                        isAuthenticated ? (
                            <TasksPage />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Настройки (только авторизованные) */}
                <Route
                    path="/settings"
                    element={
                        isAuthenticated ? (
                            <SettingsPage />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AppLayout>
    );
}