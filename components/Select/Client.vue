<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IClient>, 'required'>>()

const { items, search, onData } = useSelect<IClient>('/api/clients')

const value = defineModel<IClient | null>() 
</script>

<template>
    <SkSelect
        label="Clientes"
        :options="items"
        :required="required"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.name }}
        </template>
    </SkSelect>
</template>