import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  return {
    handleLogout: () => logoutMutation.mutateAsync(),
    isPending: logoutMutation.isPending,
  };
};