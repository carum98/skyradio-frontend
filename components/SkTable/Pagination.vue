<script setup lang="ts">
import type { SkPaginationProps } from './sk-table'

const { pagination } = defineProps<SkPaginationProps>()

const router = useRouter()
const route = useRoute()

// data
const maxPagesToShow = 5
const page = defineModel<number>()

// computed
const disabledPrev = computed(() => pagination.page === 1)
const disabledNext = computed(() => pagination.page === pagination.total_pages)

const pages = computed(() => {
    const pages = []

    if (pagination.total_pages <= maxPagesToShow) {
        for (let i = 1; i <= pagination.total_pages; i++) {
            pages.push(i)
        }
    } else {
        const half = Math.floor(maxPagesToShow / 2)
        let start = pagination.page - half
        let end = pagination.page + half

        if (start <= 0) {
            start = 1
            end = maxPagesToShow
        }

        if (end > pagination.total_pages) {
            start = pagination.total_pages - maxPagesToShow + 1
            end = pagination.total_pages
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
    }

    return pages
})

// methods
function prevPage() {
    page.value = pagination.page - 1
}

function nextPage() {
    page.value = pagination.page + 1
}

function goToPage(value: number) {
    page.value = value 
}

// hooks
watch(page, (value) => {
    router.replace({ query: { ...route.query, page: value } })
}, { immediate: true })
</script>

<template>
    <section class="sk-pagination" v-if="pagination.total_pages > 1">
        <button @click="goToPage(1)">«</button>
        <button :disabled="disabledPrev" @click="prevPage">‹</button>
        
        <button 
            v-for="item in pages" 
            :class="{ active: item === pagination.page }"
            @click="goToPage(item)"
        >
            {{ item }}
        </button>

        <button :disabled="disabledNext" @click="nextPage">›</button>
        <button @click="goToPage(pagination.total_pages)">»</button>
    </section>
</template>