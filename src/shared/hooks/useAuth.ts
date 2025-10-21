import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi, logoutApi } from '../api/auth/loginApi';
import { registerApi } from '../api/auth/registerApi';

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            // Обновляем кеш пользователя
            queryClient.setQueryData(['user'], data.user);
            // Редирект на dashboard (главную личного кабинета)
            navigate('/dashboard', { replace: true });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ошибка входа';
            throw new Error(message);
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            // Обновляем кеш пользователя
            queryClient.setQueryData(['user'], data.user);
            // Редирект на dashboard после регистрации
            navigate('/dashboard', { replace: true });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ошибка регистрации';
            throw new Error(message);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            // Очищаем кеш пользователя
            queryClient.setQueryData(['user'], null);
            // Редирект на главную
            navigate('/', { replace: true });
        },
    });

    return {
        loginMutation,
        registerMutation,
        logoutMutation,
    };
};