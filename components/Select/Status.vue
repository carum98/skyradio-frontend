<script setup lang="ts">
const { items, search, onData } = useSelect<IRadioStatus>('/api/radios-status')

const value = defineModel<IRadioStatus | null>() 
</script>

<template>
    <SkSelect
        label="Estado"
        :options="items"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            <span class="badge-color mr-1" :style="{ backgroundColor: item?.color }"></span>
            {{ item?.name }}
        </template>
    </SkSelect>
</template>