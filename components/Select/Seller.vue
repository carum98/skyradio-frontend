<script setup lang="ts">
const { items, search, onData } = useSelect<ISeller>('/api/clients-seller')

const value = defineModel<ISeller | null>() 
</script>

<template>
    <SkSelect
        label="Vendedor"
        :options="items"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.name }}
        </template>
    </SkSelect>
</template>