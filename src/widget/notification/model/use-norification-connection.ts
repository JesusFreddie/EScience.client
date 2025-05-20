export function useNotificationConnection() {

    const { $signalR } = useNuxtApp()

    const isOpen = ref<boolean>(false)
    const notifications = ref<any>([])

    // Initialize useFetch at the top level
    const { data: fetchedNotifications } = useFetch<any[]>('api/notification', {
        credentials: 'include'
    })

    function toggleNotification() {
        isOpen.value = !isOpen.value 
    }

    async function setupSignal() {
        try {
            // Connection is already started in the plugin, no need to start it again
            // Only set up event handlers here

            $signalR.on("NewNotification", (notification) => {
                // Add the new notification to the beginning of the array
                notifications.value.unshift(notification)
            })

            $signalR.onclose(async () => {
                console.log("SignalR connection closed, attempting to reconnect...")
                await new Promise(resolve => setTimeout(resolve, 5000))
                try {
                    await $signalR.start()
                    console.log("SignalR reconnected successfully")
                } catch (err) {
                    console.error("Failed to reconnect to SignalR:", err)
                }
            })
        } catch(err) {
            console.error('SignalR connection error:', err)
        }
    }

    const loadNotifications = () => {
        if (fetchedNotifications.value) {
            notifications.value = fetchedNotifications.value
        }
    }

    onMounted(() => {
        setupSignal()
        loadNotifications()
    })

    return {
        isOpen,
        toggleNotification
    }
}
