<script lang="ts" setup>
import type { Notification } from '../../api/model';

const { notification } = defineProps<{
    notification: Notification
}>()

</script>

<template>
    <div>
        <div>
            <p>{{ notification.title }}</p>
        </div>
        <div>
            <p>{{ notification.message }}</p>
        </div>
    </div>
</template>