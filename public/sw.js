self.addEventListener('push', (event) => {
    if (!event.data) {
        console.log('Push получен, но данных нет');
        return;
    }

    try {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: data.icon || '/garden-icon.png',
            badge: data.badge || '/garden-badge.png',
            tag: data.tag || 'notification',
            requireInteraction: data.requireInteraction || false,
            data: data.data || {},
            actions: [
                {
                    action: 'open',
                    title: 'Открыть'
                },
                {
                    action: 'close',
                    title: 'Закрыть'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } catch (error) {
        console.error('Ошибка обработки push:', error);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

self.addEventListener('notificationclose', (event) => {
    console.log('Уведомление закрыто:', event.notification.tag);
});