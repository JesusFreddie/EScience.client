import {
    useNotificationCountUnread,
    useNotificationGet,
    useNotificationMarkRead, useNotificationMarkReadAll
} from "~/src/shared/api/generate/notification"

export function useNotification() {

    const { data: countResult, isPending: isNotificationsPending } = useNotificationCountUnread()

    const { data: notificationResult } = useNotificationGet()

    const { mutate: mutateMarkRead } = useNotificationMarkRead()
    const { mutate: mutateMarkReadAll } = useNotificationMarkReadAll()

    return {
        countResult,
        notificationResult,
        isNotificationsPending,
        mutateMarkRead,
        mutateMarkReadAll,
    }
}