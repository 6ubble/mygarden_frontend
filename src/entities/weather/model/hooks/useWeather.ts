import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../../../../entities/weather/api/weatherApi';
import { type WeatherData } from '../types/types';

export const useWeather = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      return new Promise<WeatherData>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const weatherData = await weatherApi.getWeather(
                position.coords.latitude,
                position.coords.longitude
              );
              resolve(weatherData);
            } catch (err) {
              reject(err);
            }
          },
          (err) => {
            if (err.code === 1) {
              reject(new Error('Разреши доступ к геолокации'));
            } else if (err.code === 3) {
              reject(new Error('Таймаут при определении локации'));
            } else {
              reject(new Error('Ошибка при получении локации'));
            }
          },
          { timeout: 10000, enableHighAccuracy: false }
        );
      });
    },
    retry: 1,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    data: data || null,
    isLoading,
    error: error?.message || null,
  };
};