<script lang="ts" setup>
import type { Notification } from '../../api/model';

const { notification } = defineProps<{
    notification: Notification
}>()

const emit = defineEmits<{
    (e: 'markAsRead', id: number): void
}>()

const handleClick = () => {
    if (notification.id) {
        emit('markAsRead', notification.id)
    }
}

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
    </div>
</template>
