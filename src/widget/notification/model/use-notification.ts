import { useNotificationCountUnread, useNotificationGet } from "~/src/shared/api/generate/notification"

export function useNotification() {

    const { data: countResult, isPending: isNotificationsPending } = useNotificationCountUnread()

    const { data: notificationResult } = useNotificationGet()

    return {
        countResult,
        notificationResult,
        isNotificationsPending
    }
}