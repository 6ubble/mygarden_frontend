import { Leaf, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth';
import { useUser } from '../shared/hooks/useUser';
import { useState } from 'react';

export const Account = () => {
    const { data: user } = useUser();
    const { logoutMutation } = useAuth();
    const [menu, setMenu] = useState(false);
    const nav = useNavigate();

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        nav('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold">Мой Сад</span>
                    </Link>

                    <div className="relative">
                        <button 
                            onClick={() => setMenu(!menu)}
                            className="text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
                        >
                            {user?.name}
                        </button>

                        {menu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-20">
                                    <p className="px-4 py-2 text-xs text-gray-600">{user?.email}</p>
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
                </div>
            </header>

            <main className="flex-grow pt-16 pb-20 max-w-7xl mx-auto w-full px-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Привет, {user?.name}! 👋</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="text-center py-12">
                        <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Личный кабинет</h3>
                        <p className="text-gray-600 mb-6">Здесь будет информация вашего профиля</p>
                    </div>
                </div>
            </main>
        </div>
    );
};