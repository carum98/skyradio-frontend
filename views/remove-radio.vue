<script setup lang="ts">
defineProps<{
    client: IClient
    onUpdate: () => void
}>()
</script>

<template>
    <h1>Remove Radio</h1>
    <pre>
        {{ client }}
    </pre>
</template>