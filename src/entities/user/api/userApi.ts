import { client } from '../../../shared/api/client';

export type User = {
  id: number;
  name: string;
  email: string;
};

export const userApi = {
  getProfile: async (): Promise<User | null> => {
    try {
      const response = await client.get('/auth/profile');
      return response.data.user;
    } catch (err: any) {
      if (err.response?.status === 401) {
        return null;
      }
      console.error('Ошибка при получении профиля:', err.message);
      return null;
    }
  },
};