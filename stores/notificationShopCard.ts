import { defineStore } from 'pinia';

export const addNotificationCard = defineStore('addNotification', () => {
    const notificationId = ref<number | null>(null)

    function addCart(id: number) {
        notificationId.value = id
        setTimeout(() => {
            notificationId.value = null;
        }, 3000);
    }

    return { addCart, notificationId }
});
