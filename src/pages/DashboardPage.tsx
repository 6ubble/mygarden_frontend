import { useUser } from '../shared/hooks/useUser';
import { useWeather } from '../shared/hooks/useWeather';
import { useFrostAlert } from '../shared/hooks/useFrostAlert';
import { useWateringAlert } from '../shared/hooks/useWateringAlert';
import { WeatherCard } from '../features/weather/WeatherCard';
import { FrostAlertCard } from '../features/weather/FrostAlertCard';
import { WateringRecommendationCard } from '../features/weather/WateringRecommendationCard';

export const Dashboard = () => {
    const { data: user } = useUser();
    const { data: weather, isLoading: weatherLoading, error: weatherError } = useWeather();
    const { data: frostAlert, isLoading: frostLoading } = useFrostAlert();
    const { data: wateringAlert, isLoading: wateringLoading } = useWateringAlert();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Погода */}
            <WeatherCard weather={weather} isLoading={weatherLoading} error={weatherError} />

            {/* ⚠️ Предупреждение о заморозках */}
            <FrostAlertCard alert={frostAlert} isLoading={frostLoading} />

            {/* 💧 Рекомендация по поливу */}
            <WateringRecommendationCard alert={wateringAlert} isLoading={wateringLoading} />

            {/* Приветствие */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Привет, {user?.name}! 👋</h1>
                <p className="text-gray-600">Добро пожаловать в ваш личный кабинет</p>
            </div>
        </div>
    );
};