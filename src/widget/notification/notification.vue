<script lang="ts" setup>
import NotificationCard from '~/src/shared/ui/notification/notification-card.vue';
import { useNotificationConnection } from './model/use-norification-connection';
import { useNotification } from './model/use-notification';
import NotificationIcon from './notification-icon.vue';

const { isOpen, toggleNotification } = useNotificationConnection()
const {
  countResult,
  notificationResult,
  isNotificationsPending,
  mutateMarkReadAll,
  mutateMarkRead,
  refetchNotification,
  refetchCount
} = useNotification()

const markNotificationAsRead = (id: number) => {
  mutateMarkRead({ id: id })
}

const markAllAsRead = () => {
  mutateMarkReadAll()
}

const confirmInvite = (id: number) => {
  // TODO: Implement API call to confirm invite
  console.log('Confirm invite', id)
  // Mark as read after confirming - refetch happens automatically
  markNotificationAsRead(id)
}

const declineInvite = (id: number) => {
  // TODO: Implement API call to decline invite
  console.log('Decline invite', id)
  // Mark as read after declining - refetch happens automatically
  markNotificationAsRead(id)
}

</script>

<template>
    <UChip v-if="countResult && countResult.count > 0" :text="countResult.count" size="2xl" color="primary">
        <NotificationIcon @click="toggleNotification" />
    </UChip>
    <NotificationIcon v-else @click="toggleNotification" />
    <USlideover class="flex-1 pr-2 py-2" v-model="isOpen" :ui="{
        rounded: 'rounded'
    }">
        <div class="h-full flex flex-col">
            <div class="flex justify-between items-center gap-2 p-4 border-b border-gray-200">
                <div>
                    <h2 class="text-xl font-semibold text-gray-800">{{ $t('NOTIFICATIONS') }}</h2>
                </div>
                <div>
                    <UButton 
                      v-if="notificationResult && notificationResult.length > 0"
                      color="gray" 
                      variant="ghost" 
                      @click="markAllAsRead"
                      :disabled="notificationResult.every(n => n.is_read)"
                    >
                      {{ $t('MARK_ALL_AS_READ') }}
                    </UButton>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
                <div class="flex flex-col gap-3">
                    <NotificationCard 
                      v-if="notificationResult" 
                      v-for="notification in notificationResult"
                      :key="notification.id"
                      :notification="notification" 
                      @mark-as-read="markNotificationAsRead"
                      @confirm-invite="confirmInvite"
                      @decline-invite="declineInvite"
                    />
                    <div v-if="isNotificationsPending" class="p-4 text-center text-gray-500">
                      <UIcon name="i-heroicons-arrow-path" class="animate-spin mr-2" />
                      {{ $t('LOADING') }}
                    </div>
                    <div v-if="!isNotificationsPending && !notificationResult?.length" class="p-4 text-center text-gray-500">
                      <UIcon name="i-heroicons-bell-slash" class="mb-2 h-8 w-8" />
                      <p>{{ $t('NO_NOTIFICATIONS') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </USlideover>
</template>
