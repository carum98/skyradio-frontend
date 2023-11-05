<script setup lang="ts">
import type { SkPaginationProps, SkPaginationEmits } from './sk-table'

const { pagination } = defineProps<SkPaginationProps>()
const emit = defineEmits<SkPaginationEmits>()

function prevPage() {
    emit('onPage', pagination.page - 1)
}

function nextPage() {
    emit('onPage', pagination.page + 1)
}

function goToPage(page: number) {
    emit('onPage', page)
}
</script>

<template>
    <section class="sk-pagination" v-if="pagination.total_pages > 1">
        <button @click="goToPage(1)">«</button>
        <button @click="prevPage">‹</button>
        
        <button v-for="item in pagination.total_pages" @click="goToPage(item)">
            {{ item }}
        </button>

        <button @click="nextPage">›</button>
        <button @click="goToPage(pagination.total_pages)">»</button>
    </section>
</template>