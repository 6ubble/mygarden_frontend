// Service Worker для push уведомлений

self.addEventListener('push', (event) => {
    console.log('🔔 PUSH EVENT RECEIVED:', event);
    
    if (!event.data) {
        console.log('Push получен, но данных нет');
        return;
    }

    try {
        let data;
        
        // Пытаемся распарсить как JSON
        try {
            data = event.data.json();
            console.log('✅ JSON распарсен:', data);
        } catch (e) {
            // Если не JSON - берём как текст
            data = {
                title: 'Уведомление',
                body: event.data.text()
            };
            console.log('⚠️ Текст вместо JSON:', data);
        }

        const options = {
            body: data.body || 'Новое уведомление',
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

        console.log('📤 Показываем уведомление:', data.title, options);

        event.waitUntil(
            self.registration.showNotification(data.title || 'Уведомление', options)
                .then(() => console.log('✅ Уведомление показано!'))
                .catch((err) => console.error('❌ Ошибка показа уведомления:', err))
        );
    } catch (error) {
        console.error('❌ Ошибка обработки push:', error);
    }
});

// Обработка клика на уведомление
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    // Открываем главную страницу приложения
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

// Обработка закрытия уведомления
self.addEventListener('notificationclose', (event) => {
    console.log('Уведомление закрыто:', event.notification.tag);
});