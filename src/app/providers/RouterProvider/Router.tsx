import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '../../../features/auth/ui/Login';
import { Register } from '../../../features/auth/ui/Register';
import { Dashboard } from '../../../pages/DashboardPage';
import { MapPage } from '../../../pages/MapPage';
import { CalendarPage } from '../../../pages/CalendarPage';
import { TasksPage } from '../../../pages/TasksPage';
import { NotificationsPage } from '../../../pages/NotificationsPage';
import { SettingsPage } from '../../../pages/SettingsPage';
import { Header } from '../../../widgets/header/Header';
import { Footer } from '../../../widgets/footer/Footer';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Router() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login onSwitchToRegister={() => {}} />
            </AuthLayout>
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout>
              <Register onSwitchToLogin={() => {}} />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <MapPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <CalendarPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <TasksPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <NotificationsPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <SettingsPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}