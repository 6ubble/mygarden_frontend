import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '../api/user/userApi';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUserApi,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};