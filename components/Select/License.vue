<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<ILicense>, 'required' | 'showClear'>>()

const { items, search, onData, loading } = useSelect<ILicense>('/api/licenses')

const value = defineModel<ILicense | null>() 
</script>

<template>
    <SkSelect
        label="Licencia"
        :options="items"
        :required="required"
        :loading="loading"
        :show-clear="showClear"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.key }}
        </template>
    </SkSelect>
</template>