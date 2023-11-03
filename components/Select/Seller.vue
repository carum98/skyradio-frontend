<script setup lang="ts">
const { items, search, onData } = useSelect<ISeller>('/api/companies-seller')

const value = ref<ISeller | null>(null)
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