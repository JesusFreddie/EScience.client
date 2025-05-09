<script lang="ts" setup>
import NotificationIcon from './notification-icon.vue';

const isOpen = ref<boolean>(false)

function toggleNotification() {
    isOpen.value = !isOpen.value 
}

</script>

<template>
    <NotificationIcon @click="toggleNotification" />
    <USlideover 
        class="flex-1 pr-2 py-2" 
        v-model="isOpen"
        :ui="{
        rounded: 'rounded'
        }"
        >
        asdasdasd
    </USlideover>
</template>