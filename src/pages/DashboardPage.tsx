import { useWeather } from '../shared/hooks/useWeather';
import { useAlerts } from '../shared/hooks/useAlerts';
import { usePushSubscription } from '../shared/hooks/usePushSubscription';
import { WeatherCard } from '../features/weather/WeatherCard';
import { FrostAlertCard } from '../features/weather/FrostAlertCard';
import { WateringRecommendationCard } from '../features/weather/WateringRecommendationCard';

export const Dashboard = () => {
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
        </div>
    );
};