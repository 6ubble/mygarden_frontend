import { client } from '../client';

export const getUserApi = async () => {
    try {
        const response = await client.get('/auth/profile');
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            return null;
        }
        throw err;
    }
};