import { Bell, Trash2, CheckCheck } from 'lucide-react';
import { useNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead, useDeleteNotification } from '../shared/hooks/useNotifications';

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

export function NotificationsPage() {
    const { data, isLoading, error } = useNotifications();
    const { data: unreadData } = useUnreadCount();
    const markAsReadMutation = useMarkAsRead();
    const markAllAsReadMutation = useMarkAllAsRead();
    const deleteNotificationMutation = useDeleteNotification();

    const notifications = data?.notifications || [];
    const unreadCount = unreadData || 0;

    const handleMarkAsRead = (notificationId: number) => {
        markAsReadMutation.mutate(notificationId);
    };

    const handleMarkAllAsRead = () => {
        markAllAsReadMutation.mutate();
    };

    const handleDelete = (notificationId: number) => {
        deleteNotificationMutation.mutate(notificationId);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Bell className="w-8 h-8 text-blue-600" />
                    <div>
                        <h1 className="text-3xl font-bold">Уведомления</h1>
                        <p className="text-gray-600">
                            {unreadCount > 0 ? `${unreadCount} непрочитанных` : 'Все прочитаны'}
                        </p>
                    </div>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllAsRead}
                        disabled={markAllAsReadMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        <CheckCheck className="w-5 h-5" />
                        Отметить все прочитанными
                    </button>
                )}
            </div>

            {/* Список уведомлений */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    Ошибка при загрузке уведомлений
                </div>
            ) : notifications.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">У вас нет уведомлений</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
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
                                            onClick={() => handleMarkAsRead(notification.id)}
                                            disabled={markAsReadMutation.isPending}
                                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                                            title="Отметить прочитанным"
                                        >
                                            <CheckCheck className="w-5 h-5 text-gray-600" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notification.id)}
                                        disabled={deleteNotificationMutation.isPending}
                                        className="p-2 hover:bg-red-200 rounded transition-colors"
                                        title="Удалить"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}