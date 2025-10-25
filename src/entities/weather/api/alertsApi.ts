import { client } from '../../../shared/api/client';
import type { AlertsData } from '../model/types/types';

export const alertsApi = {
  getAlerts: async (latitude: number, longitude: number): Promise<AlertsData> => {
    const response = await client.get('/api/alerts', {
      params: { latitude, longitude }
    });
    return response.data;
  },
};