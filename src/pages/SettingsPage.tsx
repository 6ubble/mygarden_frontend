import { Settings, LogOut } from 'lucide-react';
import { useUser } from '../entities/user/model/hooks/useUser';
import { useLogout } from '../features/auth/model/hooks/useLogout';
import { Loading } from '../shared/ui/Loading';

export function SettingsPage() {
  const { data: user, isLoading } = useUser();
  const { handleLogout, isPending } = useLogout();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold">Настройки</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Профиль</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Имя</p>
              <p className="text-lg font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Опасная зона</h2>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 rounded-lg transition disabled:opacity-50"
          >
            <LogOut className="w-5 h-5" />
            {isPending ? 'Выходим...' : 'Выйти из аккаунта'}
          </button>
        </div>
      </div>
    </div>
  );
}