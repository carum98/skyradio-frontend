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

function goToPage(page: number) {
    emit('onPage', page)
}
</script>

<template>
    <section class="sk-pagination">
        <button @click="goToPage(1)">«</button>
        <button @click="prevPage">‹</button>
        
        <button v-for="item in pagination.total_pages" @click="goToPage(item)">
            {{ item }}
        </button>

        <button @click="nextPage">›</button>
        <button @click="goToPage(pagination.total_pages)">»</button>
    </section>
</template>