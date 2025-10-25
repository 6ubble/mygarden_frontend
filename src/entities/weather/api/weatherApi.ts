import { client } from '../../../shared/api/client';
import type { WeatherData } from '../model/types/types';

export const weatherApi = {
  getWeather: async (latitude: number, longitude: number): Promise<WeatherData> => {
    const response = await client.get('/api/weather', {
      params: { latitude, longitude }
    });
    return response.data;
  },
};