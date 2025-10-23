import { useEffect, useState } from 'react';
import { subscribeToPush, isPushSubscribed } from '../utils/pushSubscriptionManager';

export const usePushSubscription = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAndSubscribe();
    }, []);

    const checkAndSubscribe = async () => {
        try {
            setIsLoading(true);

            const subscribed = await isPushSubscribed();
            setIsSubscribed(subscribed);

            if (!subscribed && 'geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const success = await subscribeToPush(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        setIsSubscribed(success);
                    },
                    (error) => {
                        console.warn('Ошибка геолокации:', error);
                    },
                    { timeout: 5000 }
                );
            }
        } catch (error) {
            console.error('Ошибка в usePushSubscription:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isSubscribed,
        isLoading,
        subscribe: checkAndSubscribe
    };
};