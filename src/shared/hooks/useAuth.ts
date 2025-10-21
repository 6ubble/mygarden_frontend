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
            queryClient.setQueryData(['user'], data.user);
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
            queryClient.setQueryData(['user'], data.user);
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
            queryClient.setQueryData(['user'], null);
            navigate('/', { replace: true });
        },
    });

    return {
        loginMutation,
        registerMutation,
        logoutMutation,
    };
};