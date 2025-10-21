import { Leaf } from 'lucide-react';
import { useUser } from '../shared/hooks/useUser';

export const Dashboard = () => {
    const { data: user } = useUser();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Привет, {user?.name}! 👋</h1>
                <p className="text-gray-600">Добро пожаловать в ваш личный кабинет</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Активные растения</h3>
                        <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-700">0</p>
                    <p className="text-sm text-gray-600 mt-2">Добавьте первое растение</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Задачи сегодня</h3>
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">0</div>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">0</p>
                    <p className="text-sm text-gray-600 mt-2">Нет задач на сегодня</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Площадь участка</h3>
                        <div className="w-6 h-6 text-orange-600 text-lg">📐</div>
                    </div>
                    <p className="text-3xl font-bold text-orange-700">-</p>
                    <p className="text-sm text-gray-600 mt-2">Настройте в карте</p>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-semibold mb-4">Начните с этого</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition cursor-pointer">
                        <h3 className="font-semibold mb-2">📍 Создайте карту участка</h3>
                        <p className="text-sm text-gray-600">Разместите растения на интерактивной карте вашего участка</p>
                    </div>
                    <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition cursor-pointer">
                        <h3 className="font-semibold mb-2">📅 Добавьте растения</h3>
                        <p className="text-sm text-gray-600">Создайте список растений и отслеживайте их рост</p>
                    </div>
                    <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition cursor-pointer">
                        <h3 className="font-semibold mb-2">✓ Планируйте работы</h3>
                        <p className="text-sm text-gray-600">Создавайте расписание полива, удобрений и других работ</p>
                    </div>
                    <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition cursor-pointer">
                        <h3 className="font-semibold mb-2">📊 Отслеживайте прогресс</h3>
                        <p className="text-sm text-gray-600">Смотрите статистику и результаты ваших работ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};