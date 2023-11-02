<script setup lang="ts">
const { items, onData } = useSelect<IModality>('/api/companies-modality')

const value = ref<IModality | null>(null)
</script>

<template>
    <SkSelect
        label="Modalidad"
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