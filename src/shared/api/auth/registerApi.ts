import { client } from '../client';

export const registerApi = async (data: { email: string; password: string; name: string }) => {
    const response = await client.post('/auth/register', data);
    return response.data; // { user: {...} }
};

// src/shared/api/user/userApi.ts
export const getUserApi = async () => {
    try {
        const response = await client.get('/auth/profile');
        return response.data; // { user: {...} }
    } catch (err: any) {
        if (err.response?.status === 401) {
            return null;
        }
        throw err;
    }
};
