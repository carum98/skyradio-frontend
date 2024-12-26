<script setup lang="ts" generic="T extends { [x: string]: any }">
import type { SkTablePropsBaseGrid, SkTableSlotsBaseGrid, SkTableEmits } from './sk-table';

defineProps<SkTablePropsBaseGrid<T>>()
defineSlots<SkTableSlotsBaseGrid<T>>()
const emit = defineEmits<SkTableEmits<T>>()

// methods
function onRowClick(row: T) {
    emit('onRowClick', row)
}
</script>

<template>
    <ul class="sk-grid" :class="{ hover }">
        <li v-for="item in data" :key="item.code" @click="onRowClick(item)">
            <slot name="cell" :item="item">
                {{ item }}
            </slot>
        </li>
    </ul>
</template>