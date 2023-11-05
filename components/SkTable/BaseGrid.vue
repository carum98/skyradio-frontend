<script setup lang="ts" generic="T extends { [x: string]: any }">
import type { SkTablePropsBaseGrid, SkTableSlotsBaseGrid } from './sk-table';

defineProps<SkTablePropsBaseGrid<T>>()
defineSlots<SkTableSlotsBaseGrid<T>>()
</script>

<template>
    <ul class="sk-grid" :class="{ hover }">
        <li v-for="item in data" :key="item.code">
            <slot name="cell" :item="item">
                {{ item }}
            </slot>
        </li>
    </ul>
</template>