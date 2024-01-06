<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<ISeller>, 'required'>>()

const { items, search, onData } = useSelect<ISeller>('/api/sellers')

const value = defineModel<ISeller | null>() 
</script>

<template>
    <SkSelect
        label="Vendedor"
        :options="items"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.name }}
        </template>
    </SkSelect>
</template>