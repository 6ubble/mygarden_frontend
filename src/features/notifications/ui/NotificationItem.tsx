import { Trash2, CheckCheck } from 'lucide-react';
import type { Notification } from '../api/notificationsApi';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  isMarkLoading: boolean;
  isDeleteLoading: boolean;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'frost':
      return '🧊';
    case 'heat':
      return '🔥';
    case 'rain':
      return '🌧️';
    case 'watering':
      return '💧';
    default:
      return '📢';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'frost':
      return 'border-l-4 border-blue-500 bg-blue-50';
    case 'heat':
      return 'border-l-4 border-red-500 bg-red-50';
    case 'rain':
      return 'border-l-4 border-cyan-500 bg-cyan-50';
    case 'watering':
      return 'border-l-4 border-green-500 bg-green-50';
    default:
      return 'border-l-4 border-gray-500 bg-gray-50';
  }
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  isMarkLoading,
  isDeleteLoading,
}: NotificationItemProps) {
  return (
    <div
      className={`${getNotificationColor(notification.type)} rounded-lg p-4 transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl mt-1">{getNotificationIcon(notification.type)}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              {!notification.is_read && (
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </div>
            <p className="text-gray-700 text-sm mt-1">{notification.body}</p>
            <p className="text-gray-500 text-xs mt-2">
              {new Date(notification.created_at).toLocaleString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {!notification.is_read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              disabled={isMarkLoading}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Отметить прочитанным"
            >
              <CheckCheck className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            disabled={isDeleteLoading}
            className="p-2 hover:bg-red-200 rounded transition-colors"
            title="Удалить"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}