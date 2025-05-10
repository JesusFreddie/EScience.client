export function useNotificationConnection() {

    const { $signalR } = useNuxtApp()

    const isOpen = ref<boolean>(false)
    const notifications = ref<any>([])

    function toggleNotification() {
        isOpen.value = !isOpen.value 
    }

    async function setupSinal() {
        try {
            await $signalR.start()

            $signalR.on("NewNotification", () => {
                notifications.value.unshift(notifications)
            })

            $signalR.onclose(async () => {
                await new Promise(resolve => setTimeout(resolve, 5000))
                $signalR.start()
            })
        } catch(err) {
            console.error('SignalR connection error:', err)
        }
    }

    const loadNotifications = async () => {
        try {
            const { data } = await useFetch<any[]>('api/notification', {
                credentials: 'include'
            })
            notifications.value = data.value
        } catch (err) {
            console.error('Error loading notifications:', err)
        }
    }

    onMounted(() => {
        setupSinal()
        loadNotifications()
    })

    return {
        isOpen,
        toggleNotification
    }
}