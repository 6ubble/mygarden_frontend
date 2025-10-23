import { client } from '../client';

export type Notification = {
  id: number;
  title: string;
  body: string;
  type: 'frost' | 'watering' | 'rain' | 'heat';
  data: any;
  is_read: boolean;
  created_at: string;
};

export const getNotificationsApi = async (limit = 50, offset = 0): Promise<{ notifications: Notification[], unreadCount: number }> => {
    const response = await client.get('/api/notifications', {
        params: { limit, offset }
    });
    return response.data;
};

export const getUnreadCountApi = async (): Promise<number> => {
    const response = await client.get('/api/notifications/unread-count');
    return response.data.unreadCount;
};

export const markAsReadApi = async (notificationId: number): Promise<void> => {
    await client.put(`/api/notifications/${notificationId}/read`);
};

export const markAllAsReadApi = async (): Promise<void> => {
    await client.put('/api/notifications/read-all');
};

export const deleteNotificationApi = async (notificationId: number): Promise<void> => {
    await client.delete(`/api/notifications/${notificationId}`);
};