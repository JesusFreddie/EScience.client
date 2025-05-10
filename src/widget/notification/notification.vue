<script lang="ts" setup>
import NotificationCard from '~/src/shared/ui/notification/notification-card.vue';
import { useNotificationConnection } from './model/use-norification-connection';
import { useNotification } from './model/use-notification';
import NotificationIcon from './notification-icon.vue';

const { isOpen, toggleNotification } = useNotificationConnection()
const { countResult, notificationResult, isNotificationsPending } = useNotification()

</script>

<template>
    <UChip v-if="countResult" :text="countResult.count" size="2xl">
        <NotificationIcon @click="toggleNotification" />
    </UChip>
    <NotificationIcon v-else @click="toggleNotification" />
    <USlideover class="flex-1 pr-2 py-2" v-model="isOpen" :ui="{
        rounded: 'rounded'
    }">
        <div>
            <div class="flex justify-between items-center gap-2">
                <div>
                    <p>{{ $t('NOTIFICATIONS') }}</p>
                </div>
                <div>
                    <UButton>+</UButton>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <NotificationCard v-if="notificationResult" v-for="notification in notificationResult"
                    :notification="notification" />
                <div v-if="isNotificationsPending">Loading notifications</div>
                <div v-if="!isNotificationsPending && !notificationResult?.length">Not found</div>
            </div>
        </div>
    </USlideover>
</template>