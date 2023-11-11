<script setup lang="ts">
const { items, search, onData } = useSelect<IClient>('/api/clients')

const value = defineModel<IClient | null>() 
</script>

<template>
    <SkSelect
        label="Clientes"
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