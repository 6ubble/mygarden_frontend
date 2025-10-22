import { client } from '../client';

export type FrostAlertData = {
  temp: number;
  time: string;
  isFrost: boolean;
  city: string;
  description: string;
  humidity: number;
  timestamp: number;
  fromCache?: boolean;
};

export const getFrostAlertApi = async (latitude: number, longitude: number): Promise<FrostAlertData> => {
    const response = await client.get('/api/frost-alert', {
        params: { latitude, longitude }
    });
    return response.data;
};