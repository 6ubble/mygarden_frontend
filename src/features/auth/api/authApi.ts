import { client } from '../../../shared/api/client';

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await client.post('/auth/login', data);
    return response.data;
  },

  register: async (data: { email: string; password: string; name: string }) => {
    const response = await client.post('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await client.post('/auth/logout');
    return response.data;
  },
};