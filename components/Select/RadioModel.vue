<script setup lang="ts">
const { items, search, onData } = useSelect<IRadioModel>('/api/radios-model')

const value = defineModel<IRadioModel | null>() 
</script>

<template>
    <SkSelect
        label="Modelo"
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