<script setup lang="ts" generic="T extends { [x: string]: any }">
import type { SkTablePropsBase, SkTableEmits, SkTableColumn, SkTableSlotsBase } from './sk-table'

const props = defineProps<SkTablePropsBase<T>>()
const emit = defineEmits<SkTableEmits<T>>()

defineSlots<SkTableSlotsBase<T>>()

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
    const value = getPath(row, column)

    return column.formatter ? column.formatter(value) : value
}

function getPath(row: T, column: SkTableColumn) {
    if (column.key.includes('.')) {
        const value = column.key.split('.').reduce((acc, key) => acc[key] ?? {}, row)
        return Object.keys(value).length ? value : null
    }

    return row[column.key]
}

function columnAttributes(column: SkTableColumn) {
    return {
        style: {
            width: column.width ? `${column.width}px` : undefined,
            textAlign: column.align
        }
    }
}

function rowAttributes(column: SkTableColumn) {
    return {
        style: {
            textAlign: column.align
        }
    }
}
</script>

<template>
    <table class="sk-table" :class="{ hover }">
        <thead>
            <tr>
                <th 
                    v-for="column in columns" 
                    :key="column.key" 
                    v-bind="columnAttributes(column)"
                >
                    {{ column.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="row in data" 
                :key="row.id" 
                @click="onRowClick(row)"
            >
                <td 
                    v-for="column in columns" 
                    :key="column.key"
                    v-bind="rowAttributes(column)"
                >
                    <slot
                        :name="`cell(${column.key})`"
                        :value="rowContent(row, column)"
                        :item="row"
                        :column="column"
                    >
                        {{ rowContent(row, column) }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>