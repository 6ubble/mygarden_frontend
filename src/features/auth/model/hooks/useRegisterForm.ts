import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api/authApi';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export const useRegisterForm = () => {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (data: Omit<RegisterFormData, 'confirm'>) => authApi.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/dashboard', { replace: true });
    },
  });

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    if (data.password !== data.confirm) {
      form.setError('confirm', { message: 'Пароли не совпадают' });
      return;
    }

    if (data.password.length < 6) {
      form.setError('password', { message: 'Минимум 6 символов' });
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  }, [form, registerMutation]);

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
    onSubmit,
  };
};