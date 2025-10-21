import { Leaf, Bell, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
    const nav = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                {/* Логотип слева */}
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold">Мой Сад</span>
                </Link>

                {/* Иконки справа */}
                <div className="flex items-center gap-4">
                    {/* Колокольчик уведомлений */}
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                        <Bell className="w-6 h-6 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Иконка настроек */}
                    <button
                        onClick={() => nav('/settings')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Перейти в настройки"
                    >
                        <User className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>
        </header>
    );
}
