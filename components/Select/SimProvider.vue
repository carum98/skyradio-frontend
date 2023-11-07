<script setup lang="ts">
const { items, search, onData } = useSelect<ISimProvider>('/api/sims-provider')

const value = defineModel<ISimProvider | null>() 
</script>

<template>
    <SkSelect
        label="Provedor"
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