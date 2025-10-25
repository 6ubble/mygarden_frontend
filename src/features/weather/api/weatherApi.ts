import { client } from '../../../shared/api/client';

export type WeatherData = {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  city: string;
  fromCache?: boolean;
};

export const weatherApi = {
  getWeather: async (latitude: number, longitude: number): Promise<WeatherData> => {
    const response = await client.get('/api/weather', {
      params: { latitude, longitude }
    });
    return response.data;
  },
};