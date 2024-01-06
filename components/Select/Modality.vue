<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IModality>, 'required'>>()

const { items, search, onData } = useSelect<IModality>('/api/clients-modality')

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
            <span class="badge-color mr-1" :style="{ backgroundColor: item?.color }"></span>
            {{ item?.name }}
        </template>
    </SkSelect>
</template>