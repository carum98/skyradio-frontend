<script setup lang="ts" generic="T extends IPagination">
const props = defineProps<{
    pagination: T
}>()

const emit = defineEmits<{
  (e: 'onPage', page: number): void
}>()

function prevPage() {
    emit('onPage', props.pagination.page - 1)
}

function nextPage() {
    emit('onPage', props.pagination.page + 1)
}
</script>

<template>
    <section>
        <button @click="prevPage">Prev</button>
        <button @click="nextPage">Next</button>
    </section>
</template>