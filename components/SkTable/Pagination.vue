<script setup lang="ts" generic="T extends IPagination">
defineProps<{
    pagination: T
}>()

function prevPage() {
    console.log('prevPage')
}

function nextPage() {
    console.log('nextPage')
}
</script>

<template>
    <section>
        <button @click="prevPage">Prev</button>
        <button @click="nextPage">Next</button>
    </section>
</template>