import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotificationsApi, getUnreadCountApi, markAsReadApi, markAllAsReadApi, deleteNotificationApi } from '../api/notifications/notificationsApi';

export const useNotifications = (limit = 50, offset = 0) => {
    return useQuery({
        queryKey: ['notifications', limit, offset],
        queryFn: () => getNotificationsApi(limit, offset),
        staleTime: 1 * 60 * 1000, // 1 минута
    });
};

export const useUnreadCount = () => {
    return useQuery({
        queryKey: ['unreadCount'],
        queryFn: getUnreadCountApi,
        refetchInterval: 30 * 1000, // Обновлять каждые 30 сек
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsReadApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        },
    });
};

export const useMarkAllAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAllAsReadApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotificationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        },
    });
};