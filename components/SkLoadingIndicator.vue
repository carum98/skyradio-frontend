<script setup>
const { progress, isLoading } = useLoadingIndicator()

const opacity = computed(() => isLoading.value ? 1 : 0)
const scaleX = computed(() => `${progress.value}%`)
const backgroundSize = computed(() => `${(100 / progress.value) * 100}%`)
</script>

<template>
    <div class="sk-loading-indicator"></div>
</template>

<style>
.sk-loading-indicator {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    width: auto;
    height: 3px;
    background: repeating-linear-gradient(to right,var(--primary-color) 0%, #34cdfe 50%, var(--primary-color) 100%);
    transform-origin: left;
    transition: transform 0.1s, height 0.4s, opacity 0.4s;
    z-index: 999999;

    opacity: v-bind('opacity');
    background-size: v-bind('backgroundSize') auto;
    transform: scaleX(v-bind('scaleX'));
}
</style>