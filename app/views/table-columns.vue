<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const props = defineProps<{
    columns: SkTableColumn[]
}>()
</script>

<template>
    <div class="list-options">
        <button 
            v-for="column in props.columns"
            :data-active="column.show !== false"
            @click="column.show = !column.show"
        >
            <svg viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7Zm-1 2.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7Zm2 .5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z"/></svg>
            {{ column.altTitle || column.title }}
        </button>
    </div>
</template>