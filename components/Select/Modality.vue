<script setup lang="ts">
const { items, search, onData } = useSelect<IModality>('/api/companies-modality')

const value = defineModel<IModality | null>() 
</script>

<template>
    <SkSelect
        label="Modalidad"
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