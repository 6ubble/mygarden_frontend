import { client } from '../client';

export const getUserApi = async () => {
    try {
        const response = await client.get('/auth/profile');
        return response.data.user;
    } catch (err: any) {
        // 401 = не авторизован, просто возвращаем null
        if (err.response?.status === 401) {
            return null;
        }
        // Остальные ошибки игнорируем (чтобы не было зацикла)
        console.error('Ошибка при получении профиля:', err.message);
        return null;
    }
};