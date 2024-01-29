<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<ISeller>, 'required' | 'showClear'>>()

const { items, search, onData, loading } = useSelect<ISeller>('/api/sellers')

const value = defineModel<ISeller | null>() 
</script>

<template>
    <SkSelect
        label="Vendedor"
        :options="items"
        :required="required"
        :loading="loading"
        :show-clear="showClear"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.name }}
        </template>
    </SkSelect>
</template>