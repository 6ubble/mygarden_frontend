import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api/authApi';

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/dashboard', { replace: true });
    },
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  }, [loginMutation]);

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    onSubmit,
  };
};