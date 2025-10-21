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
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            queryClient.setQueryData(['user'], data.user);
            navigate('/');
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            queryClient.setQueryData(['user'], data.user);
            navigate('/');
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            navigate('/login');
        },
    });

    return {
        loginMutation,
        registerMutation,
        logoutMutation,
    };
};