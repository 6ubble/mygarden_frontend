import { useUser } from '../shared/hooks/useUser';
import { useWeather } from '../shared/hooks/useWeather';
import { useAlerts } from '../shared/hooks/useAlerts';
import { usePushSubscription } from '../shared/hooks/usePushSubscription';
import { WeatherCard } from '../features/weather/WeatherCard';
import { FrostAlertCard } from '../features/weather/FrostAlertCard';
import { WateringRecommendationCard } from '../features/weather/WateringRecommendationCard';

export const Dashboard = () => {
    const { data: user } = useUser();
    const { data: weather, isLoading: weatherLoading, error: weatherError } = useWeather();
    const { data: alerts, isLoading: alertsLoading } = useAlerts();
    usePushSubscription()

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Погода */}
            <WeatherCard weather={weather} isLoading={weatherLoading} error={weatherError} />

            {/* ⚠️ Предупреждение о заморозках */}
            {alerts && (
                <FrostAlertCard 
                    alert={{ ...alerts.frost, city: alerts.city, timestamp: alerts.timestamp }}
                    isLoading={alertsLoading} 
                />
            )}

            {/* 💧 Рекомендация по поливу */}
            {alerts && (
                <WateringRecommendationCard 
                    alert={{
                        city: alerts.city,
                        timezone: alerts.timezone,
                        heat: alerts.heat,
                        rain: alerts.rain,
                        recommendation: alerts.watering,
                        timestamp: alerts.timestamp
                    }}
                    isLoading={alertsLoading}
                />
            )}

            {/* Приветствие */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Привет, {user?.name}! 👋</h1>
                <p className="text-gray-600">Добро пожаловать в ваш личный кабинет</p>
            </div>

            {/* Начните с этого */}
            <div className="bg-white rounded-2xl shadow p-8">
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