import { useQuery } from '@tanstack/react-query';
import { getFrostAlertApi, type FrostAlertData } from '../api/weather/frostAlertApi';

interface UseFrostAlertResult {
    data: FrostAlertData | null;
    isLoading: boolean;
    error: string | null;
}

export const useFrostAlert = (): UseFrostAlertResult => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['frostAlert'],
        queryFn: async () => {
            return new Promise<FrostAlertData>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const alertData = await getFrostAlertApi(
                                position.coords.latitude,
                                position.coords.longitude
                            );
                            resolve(alertData);
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
        staleTime: 24 * 60 * 60 * 1000, // 24 часа
    });

    return {
        data: data || null,
        isLoading,
        error: error?.message || null,
    };
};