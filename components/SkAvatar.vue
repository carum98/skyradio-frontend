<script setup lang="ts">
const { alt, color } = defineProps<{
    alt: string
    color: string
}>()

const initials = alt.split(' ', 2).length > 1
    ? alt.split(' ', 2).map((n) => n[0]).join('')
    : alt.slice(0, 2)
</script>

<template>
    <div class="sk-avatar" :style="{ backgroundColor: color }">
        {{ initials.toUpperCase() }}
    </div>
</template>