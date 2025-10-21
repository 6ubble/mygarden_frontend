import { client } from '../client';

export const loginApi = async (data: { email: string; password: string }) => {
    const response = await client.post('/auth/login', data);
    return response.data; // { user: {...} } - БЕЗ токена
};

export const logoutApi = async () => {
    const response = await client.post('/auth/logout');
    return response.data;
};
