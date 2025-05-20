<script lang="ts" setup>
import type { Notification } from '../../api/model';
import { NotificationType } from '../../api/model/notificationType';

const { notification } = defineProps<{
    notification: Notification
}>()

const emit = defineEmits<{
    (e: 'markAsRead', id: number): void
    (e: 'confirmInvite', id: number): void
    (e: 'declineInvite', id: number): void
}>()

const handleClick = () => {
    if (notification.is_read)
      return

    if (notification.id) {
        emit('markAsRead', notification.id)
    }
}

const confirmInvite = (event: Event) => {
    event.stopPropagation()
    if (notification.id) {
        emit('confirmInvite', notification.id)
    }
}

const declineInvite = (event: Event) => {
    event.stopPropagation()
    if (notification.id) {
        emit('declineInvite', notification.id)
    }
}

const isInvite = notification.type === NotificationType.NUMBER_3

</script>

<template>
    <div @click="handleClick" 
         class="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
         :class="{ 'bg-gray-50': notification.is_read, 'bg-white': !notification.is_read }">
        <div class="flex justify-between items-start mb-2">
            <p class="font-semibold text-gray-800">{{ notification.title }}</p>
            <span v-if="!notification.is_read" class="h-2 w-2 rounded-full bg-blue-500"></span>
        </div>
        <div>
            <p class="text-gray-600">{{ notification.message }}</p>
        </div>
        <div class="mt-2 text-xs text-gray-400">
            {{ new Date(notification.created_at || '').toLocaleString() }}
        </div>
        <div v-if="isInvite" class="mt-3 flex gap-2">
            <UButton size="sm" color="green" @click="confirmInvite">{{ $t('CONFIRM') }}</UButton>
            <UButton size="sm" color="red" @click="declineInvite">{{ $t('DECLINE') }}</UButton>
        </div>
    </div>
</template>
