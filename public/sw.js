self.addEventListener('push', (event) => {
    if (!event.data) return;

    try {
        let data;

        try {
            data = event.data.json();
        } catch (e) {
            data = {
                title: 'Уведомление',
                body: event.data.text()
            };
        }

        const options = {
            body: data.body || 'Новое уведомление',
            icon: data.icon || '/garden-icon.png',
            badge: data.badge || '/garden-badge.png',
            tag: data.tag || 'notification',
            requireInteraction: data.requireInteraction || false,
            data: data.data || {},
            actions: [
                { action: 'open', title: 'Открыть' },
                { action: 'close', title: 'Закрыть' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title || 'Уведомление', options)
        );
    } catch (error) {
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (let client of clientList) {
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
});