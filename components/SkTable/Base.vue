<script setup lang="ts" generic="T extends { [x: string]: any }">
import type { SkTablePropsBase, SkTableEmits } from './sk-table'

defineProps<SkTablePropsBase<T>>()
defineEmits<SkTableEmits<T>>()
</script>

<template>
    <table class="sk-table">
        <thead>
            <tr>
                <th v-for="key in Object.keys({...data.at(0)})" :key="key">
                    {{ key }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.code" @click="$emit('onRowClick', item)">
                <td v-for="key in Object.keys(item)" :key="key">
                    {{ item[key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>