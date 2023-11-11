<script setup lang="ts">
defineProps<{
    client: IClient
    onUpdate: () => void
}>()
</script>

<template>
    <h1>Add radio</h1>
    <pre>
        {{ client }}
    </pre>
</template>