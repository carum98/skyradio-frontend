<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IClient>, 'required' | 'showClear'>>()

const { items, search, onData, loading } = useSelect<IClient>('/api/clients')

const value = defineModel<IClient | null>() 
</script>

<template>
    <SkSelect
        label="Clientes"
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