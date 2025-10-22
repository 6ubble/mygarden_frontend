import { client } from '../client';

export type WateringAlertData = {
  city: string;
  timezone: string;
  heat: {
    isHeat: boolean;
    isExtreme: boolean;
    maxTemp: number;
    humidity: number;
    description: string;
  };
  rain: {
    isRain: boolean;
    totalRain: number;
    rainHours: number;
    willRainAll: boolean;
  };
  recommendation: {
    recommendation: string | null;
    shouldWater: boolean;
    emoji: string | null;
  };
  timestamp: number;
  fromCache?: boolean;
};

export const getWateringAlertApi = async (latitude: number, longitude: number): Promise<WateringAlertData> => {
    const response = await client.get('/api/watering-alert', {
        params: { latitude, longitude }
    });
    return response.data;
};