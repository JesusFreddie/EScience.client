<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'click'): void
}>()

function click() {
    emit('click')
}

</script>

<template>
    <UButton
        icon="material-symbols:notifications-outline"
        size="sm"
        color="primary"
        square
        variant="ghost"
        @click="click"
    />
</template>