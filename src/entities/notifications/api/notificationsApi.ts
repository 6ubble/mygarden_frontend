import { client } from '../../../shared/api/client';

export type Notification = {
  id: number;
  title: string;
  body: string;
  type: 'frost' | 'watering' | 'rain' | 'heat';
  data: any;
  is_read: boolean;
  created_at: string;
};

export const notificationsApi = {
  getNotifications: async (limit = 50, offset = 0) => {
    const response = await client.get('/api/notifications', {
      params: { limit, offset }
    });
    return response.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await client.get('/api/notifications/unread-count');
    return response.data.unreadCount;
  },

  markAsRead: async (notificationId: number): Promise<void> => {
    await client.put(`/api/notifications/${notificationId}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await client.put('/api/notifications/read-all');
  },

  deleteNotification: async (notificationId: number): Promise<void> => {
    await client.delete(`/api/notifications/${notificationId}`);
  },
};