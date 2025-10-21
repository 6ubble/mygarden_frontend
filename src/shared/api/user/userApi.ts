import { client } from '../client';

export const getUserApi = async () => {
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
};