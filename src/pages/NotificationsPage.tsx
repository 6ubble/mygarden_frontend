import { Bell } from 'lucide-react';
import { useNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead, useDeleteNotification } from '../features/notifications/model/hooks/useNotifications';
import { NotificationsList } from '../features/notifications/ui/NotificationsList';

export function NotificationsPage() {
  const { data, isLoading, error } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadCount();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const notifications = data?.notifications || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Bell className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold">Уведомления</h1>
      </div>

      <NotificationsList
        notifications={notifications}
        isLoading={isLoading}
        error={error}
        unreadCount={unreadCount}
        onMarkAsRead={(id) => markAsReadMutation.mutate(id)}
        onMarkAllAsRead={() => markAllAsReadMutation.mutate()}
        onDelete={(id) => deleteNotificationMutation.mutate(id)}
        isMarkLoading={markAsReadMutation.isPending}
        isMarkAllLoading={markAllAsReadMutation.isPending}
        isDeleteLoading={deleteNotificationMutation.isPending}
      />
    </div>
  );
}