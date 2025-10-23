import { client } from '../api/client';

export const getVapidPublicKey = async (): Promise<string> => {
    try {
        const response = await client.get('/api/push/vapid-key');
        return response.data.vapidPublicKey;
    } catch (error) {
        console.error('Ошибка при получении VAPID ключа:', error);
        throw error;
    }
};

export const subscribeToPush = async (latitude: number, longitude: number): Promise<boolean> => {
    try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.warn('Push уведомления не поддерживаются');
            return false;
        }

        const vapidPublicKey = await getVapidPublicKey();

        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource
        });

        await client.post('/api/push/subscribe', {
            subscription: subscription.toJSON(),
            latitude,
            longitude
        });

        console.log('Подписаны на push уведомления');
        return true;
    } catch (error) {
        console.error('Ошибка при подписке на push:', error);
        return false;
    }
};


function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export const isPushSubscribed = async (): Promise<boolean> => {
    try {
        if (!('serviceWorker' in navigator)) {
            return false;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        return subscription !== null;
    } catch (error) {
        console.error('Ошибка при проверке подписки:', error);
        return false;
    }
};