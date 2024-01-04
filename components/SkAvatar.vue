<script setup lang="ts">
const props = defineProps<{
    alt: string
    color: string
}>()

const initials = props.alt.split(' ', 2).map((word) => word.at(0)).join('').toUpperCase()
</script>

<template>
    <div class="sk-avatar" :style="{ backgroundColor: color }">
        {{ initials }}
    </div>
</template>