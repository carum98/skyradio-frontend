<script setup lang="ts">
const props = defineProps<{
    alt: string
    color: string
}>()

const initials = props.alt.split(' ').map((word) => word[0]).join('').toUpperCase()
</script>

<template>
    <div class="sk-avatar" :style="{ backgroundColor: color }">
        {{ initials }}
    </div>
</template>