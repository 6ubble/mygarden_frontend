import { Card } from '../../shared/ui/Card';
import { Map, CalendarDays, ListTodo, Sprout, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Привет, пользователь! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Понедельник, 20 октября 2025 г.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          icon={<Map className="w-5 h-5" />}
          title="Участков"
          value="0"
          color="blue"
        />
        <StatCard
          icon={<Sprout className="w-5 h-5" />}
          title="Растений"
          value="0"
          color="green"
        />
        <StatCard
          icon={<ListTodo className="w-5 h-5" />}
          title="Задач"
          value="0"
          color="yellow"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Сегодня"
          value="0"
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Быстрые действия
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <QuickActionCard
            to="/map"
            icon={<Map className="w-6 h-6" />}
            title="Карта участка"
            color="bg-blue-500"
          />
          <QuickActionCard
            to="/calendar"
            icon={<CalendarDays className="w-6 h-6" />}
            title="Календарь"
            color="bg-green-500"
          />
        </div>
      </div>

      {/* Empty State */}
      <Card>
        <div className="text-center py-12">
          <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Начните планировать свой сад
          </h3>
          <p className="text-gray-600 mb-6">
            Создайте участок и добавьте первые растения
          </p>
          <Link to="/map">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Создать участок
            </button>
          </Link>
        </div>
      </Card>
    </>
  );
}

function StatCard({ icon, title, value, color }: any) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${colors[color as keyof typeof colors]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

function QuickActionCard({ to, icon, title, color }: any) {
  return (
    <Link to={to}>
      <Card className="p-4 hover:scale-105 transition-transform">
        <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-2`}>
          {icon}
        </div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
      </Card>
    </Link>
  );
}
