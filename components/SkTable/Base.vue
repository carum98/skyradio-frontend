<script setup lang="ts" generic="T extends { [x: string]: any }">
const props = defineProps<{
    items: T[]
}>()

const emit = defineEmits<{
    (e: 'clickRow', row: T): void
}>()
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="key in Object.keys({...items.at(0)})" :key="key">
                    {{ key }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in props.items" :key="item.code" @click="$emit('clickRow', item)">
                <td v-for="key in Object.keys(item)" :key="key">
                    {{ item[key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>