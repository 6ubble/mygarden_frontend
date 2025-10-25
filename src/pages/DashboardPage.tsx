import { useWeather } from '../entities/weather/model/hooks/useWeather';
import { useAlerts } from '../entities/weather/model/hooks/useAlerts';
import { usePushSubscription } from '../shared/hooks/usePushSubscription';
import { WeatherCard } from '../features/weather/ui/WeatherCard';
import { FrostAlertCard } from '../features/weather/ui/FrostAlertCard';
import { WateringRecommendationCard } from '../features/weather/ui/WateringRecommendationCard';

export const Dashboard = () => {
  const weather = useWeather();
  const alerts = useAlerts();
  usePushSubscription();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <WeatherCard 
        weather={weather.data} 
        isLoading={weather.isLoading} 
        error={weather.error} 
      />

      <FrostAlertCard 
        alert={alerts.data?.frost || null}
        city={alerts.data?.city || null}
        isLoading={alerts.isLoading}
      />

      <WateringRecommendationCard 
        alert={alerts.data || null}
        isLoading={alerts.isLoading}
      />
    </div>
  );
};