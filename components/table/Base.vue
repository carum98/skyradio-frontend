<script setup lang="ts">
defineProps({
    data: {
        type: Array,
        required: true
    }
})

defineEmits(['click-row'])
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="key in Object.keys(data[0])" :key="key">
                    {{ key }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.id" @click="$emit('click-row', item)">
                <td v-for="key in Object.keys(item)" :key="key">
                    {{ item[key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>