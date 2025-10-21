import { Link, useLocation } from 'react-router-dom';
import { Home, Map, CalendarDays, ListTodo } from 'lucide-react';

const navigation = [
  { name: 'Главная', path: '/dashboard', icon: Home },
  { name: 'Карта', path: '/map', icon: Map },
  { name: 'Календарь', path: '/calendar', icon: CalendarDays },
  { name: 'Задачи', path: '/tasks', icon: ListTodo },
];

export function Footer() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                  isActive
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-green-100' : ''}`} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </footer>
  );
}