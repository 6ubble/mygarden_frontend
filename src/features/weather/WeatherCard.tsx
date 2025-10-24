import { Cloud, CloudRain, Sun, Wind, Droplets, AlertCircle } from 'lucide-react';
import { type WeatherData } from '../../shared/api/weather/weatherApi';

interface WeatherCardProps {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const getWeatherIcon = (iconCode: string) => {
  if (iconCode.includes('01')) return <Sun className="w-12 h-12 text-yellow-400" />;
  if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
    return <Cloud className="w-12 h-12 text-gray-400" />;
  if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11'))
    return <CloudRain className="w-12 h-12 text-blue-400" />;
  return <Cloud className="w-12 h-12 text-gray-400" />;
};

export function WeatherCard({ weather, isLoading, error }: WeatherCardProps) {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-4">Загрузка погоды...</span>
        </div>
      ) : error ? (
        <div className="h-32 flex items-center gap-3">
          <AlertCircle className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="font-semibold">Ошибка</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      ) : weather ? (
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm opacity-90">Сейчас в {weather.city}</p>
              {weather.fromCache && (
                <span className="text-xs bg-blue-500 px-2 py-1 rounded">из кэша</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-5xl font-bold">{weather.temp}°</span>
              <div>
                <p className="text-xl font-semibold">{weather.description}</p>
                <div className="flex gap-4 mt-5 text-sm">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>Влажность: {weather.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>Ветер: {weather.windSpeed} м/с</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {getWeatherIcon(weather.icon)}
          </div>
        </div>
      ) : null}
    </div>
  );
}