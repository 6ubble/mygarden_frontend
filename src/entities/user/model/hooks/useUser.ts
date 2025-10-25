import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../api/userApi';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};