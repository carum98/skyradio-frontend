<script setup lang="ts">
const { items, onData } = useSelect<ISeller>('/api/companies-seller')

const value = ref<ISeller | null>(null)
</script>

<template>
    <SkSelect
        label="Vendedor"
        :options="items"
        :value="value"
        @input="value = $event"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.name }}
        </template>
    </SkSelect>
</template>