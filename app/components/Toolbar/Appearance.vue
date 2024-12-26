<script setup lang="ts">
function toggleTheme() {
    const rootElement = document.documentElement

    if (rootElement.classList.contains("light")) {
        rootElement.classList.replace("light", "dark");
    } else if (rootElement.classList.contains("dark")) {
        rootElement.classList.replace("dark", "light")
    } else {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        rootElement.classList.add(prefersDarkMode ? "dark" : "light");
    }
}
</script>

<template>
    <label aria-label="switch theme">
        <input class="theme-switch" type="checkbox" @click="toggleTheme">
    </label>
</template>