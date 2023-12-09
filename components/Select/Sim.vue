<script setup lang="ts">
const { items, search, onData } = useSelect<ISim>('/api/sims?radios[code][is_null]')

const value = defineModel<ISim | null>() 
</script>

<template>
    <SkSelect
        label="Sims"
        :options="items"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.number }}
        </template>
    </SkSelect>
</template>