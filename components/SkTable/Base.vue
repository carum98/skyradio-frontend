<script setup lang="ts" generic="T extends { [x: string]: any }">
import type { SkTablePropsBase, SkTableEmits, SkTableColumn } from './sk-table'

const props = defineProps<SkTablePropsBase<T>>()
const emit = defineEmits<SkTableEmits<T>>()

// computed
const columns = computed(() => {
    if (props.columns?.length) {
        return props.columns
    }

    return Object.keys({ ...props.data?.at(0) ?? {} }).map(key => ({
        title: key,
        key
    }))
})

// methods
function onRowClick(row: T) {
    emit('onRowClick', row)
}

function rowContent(row: T, column: SkTableColumn) {
    if (column.formatter) {
        return column.formatter(row[column.key])
    }

    return row[column.key]
}
</script>

<template>
    <table class="sk-table">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">
                    {{ column.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row.id" @click="onRowClick(row)">
                <td v-for="column in columns" :key="column.key">
                    {{ rowContent(row, column) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>