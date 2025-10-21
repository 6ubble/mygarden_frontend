import { client } from '../client';

export const registerApi = async (data: { email: string; password: string; name: string }) => {
    const response = await client.post('/auth/register', data);
    return response.data;
};
