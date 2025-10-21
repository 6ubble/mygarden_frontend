import { Leaf, LogOut, Bell, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { useUser } from '../../shared/hooks/useUser';
import { useState } from 'react';

export function Header() {
    const { data: user } = useUser();
    const { logoutMutation } = useAuth();
    const [menu, setMenu] = useState(false);
    const nav = useNavigate();
    const isAuthenticated = !!user;

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        nav('/');
    };

    const handleSettings = () => {
        nav('/settings');
        setMenu(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                {/* Логотип слева */}
                <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold">Мой Сад</span>
                </Link>

                {/* Иконки справа */}
                <div className="flex items-center gap-4">
                    {/* Колокольчик уведомлений (только авторизованные) */}
                    {isAuthenticated && (
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    )}

                    {/* Иконка профиля */}
                    {isAuthenticated && (
                        <div className="relative">
                            <button 
                                onClick={() => setMenu(!menu)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <User className="w-6 h-6 text-gray-600" />
                            </button>

                            {menu && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-20">
                                        <p className="px-4 py-2 text-xs text-gray-600 font-semibold">{user?.name}</p>
                                        <p className="px-4 text-xs text-gray-500">{user?.email}</p>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleSettings}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Настройки
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Выйти
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}