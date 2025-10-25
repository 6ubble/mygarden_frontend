import { Bell } from 'lucide-react';
import type { Notification } from '../../../entities/notifications/api/notificationsApi';
import { NotificationItem } from './NotificationItem';

interface NotificationsListProps {
  notifications: Notification[];
  isLoading: boolean;
  error: any;
  unreadCount: number;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: number) => void;
  isMarkLoading: boolean;
  isMarkAllLoading: boolean;
  isDeleteLoading: boolean;
}

export function NotificationsList({
  notifications,
  isLoading,
  error,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  isMarkLoading,
  isMarkAllLoading,
  isDeleteLoading,
}: NotificationsListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Ошибка при загрузке уведомлений
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">У вас нет уведомлений</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {unreadCount > 0 && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">{unreadCount} непрочитанных</p>
          <button
            onClick={onMarkAllAsRead}
            disabled={isMarkAllLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
          >
            Отметить все
          </button>
        </div>
      )}

      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
          isMarkLoading={isMarkLoading}
          isDeleteLoading={isDeleteLoading}
        />
      ))}
    </div>
  );
}