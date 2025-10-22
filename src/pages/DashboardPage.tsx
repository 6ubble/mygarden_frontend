import { useUser } from '../shared/hooks/useUser';
import { useWeather } from '../shared/hooks/useWeather';
import { WeatherCard } from '../features/weather/WeatherCard';

export const Dashboard = () => {
    const { data: user } = useUser();
    const { data: weather, isLoading: weatherLoading, error: weatherError } = useWeather();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Погода */}
            <WeatherCard weather={weather} isLoading={weatherLoading} error={weatherError} />

            {/* Приветствие */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Привет, {user?.name}! 👋</h1>
                <p className="text-gray-600">Добро пожаловать в ваш личный кабинет</p>
            </div>
        </div>
    );
};