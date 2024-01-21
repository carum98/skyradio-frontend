<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IRadioStatus>, 'required'>>()

const { items, search, onData, loading } = useSelect<IRadioStatus>('/api/radios-status')

const value = defineModel<IRadioStatus | null>() 
</script>

<template>
    <SkSelect
        label="Estado"
        :options="items"
        :required="required"
        :loading="loading"
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