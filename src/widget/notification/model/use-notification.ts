import {
    useNotificationCountUnread,
    useNotificationGet,
    useNotificationMarkRead, useNotificationMarkReadAll
} from "~/src/shared/api/generate/notification"

export function useNotification() {

    const { data: countResult, isPending: isNotificationsPending, refetch: refetchCount } = useNotificationCountUnread()

    const { data: notificationResult, refetch: refetchNotification } = useNotificationGet()

    // Initialize mutation hooks at the top level
    const { mutate: markReadMutate } = useNotificationMarkRead()
    const { mutate: markReadAllMutate } = useNotificationMarkReadAll()

    // Wrap the mutate functions to automatically refetch data after mutations
    const mutateMarkRead = (params: { id: number }) => {
        markReadMutate(params, {
            onSuccess: () => {
                // Update the local state immediately
                if (notificationResult.value) {
                    const notification = notificationResult.value.find(n => n.id === params.id)
                    if (notification) {
                        notification.is_read = true
                    }
                }
                // Refetch data to ensure consistency
                refetchCount()
                refetchNotification()
            }
        })
    }

    const mutateMarkReadAll = () => {
        markReadAllMutate(undefined, {
            onSuccess: () => {
                // Update the local state immediately
                if (notificationResult.value) {
                    notificationResult.value.forEach(notification => {
                        notification.is_read = true
                    })
                }
                // Refetch data to ensure consistency
                refetchCount()
                refetchNotification()
            }
        })
    }

    return {
        countResult,
        notificationResult,
        isNotificationsPending,
        mutateMarkRead,
        mutateMarkReadAll,
        refetchNotification,
        refetchCount
    }
}
