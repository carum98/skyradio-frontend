<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IRadioModel>, 'required'>>()

const { items, search, onData, loading } = useSelect<IRadioModel>('/api/radios-model')

const value = defineModel<IRadioModel | null>() 
</script>

<template>
    <SkSelect
        label="Modelo"
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