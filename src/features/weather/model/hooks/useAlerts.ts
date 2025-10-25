import { useQuery } from '@tanstack/react-query';
import { alertsApi, type AlertsData } from '../../api/alertsApi';

export const useAlerts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      return new Promise<AlertsData>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const alertsData = await alertsApi.getAlerts(
                position.coords.latitude,
                position.coords.longitude
              );
              resolve(alertsData);
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