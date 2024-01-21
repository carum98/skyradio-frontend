<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<ISim>, 'required'>>()

const { items, search, onData, loading } = useSelect<ISim>('/api/sims?radios[code][is_null]')

const value = defineModel<ISim | null>() 
</script>

<template>
    <SkSelect
        label="Sims"
        :options="items"
        :required="required"
        :loading="loading"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.number }}
        </template>
    </SkSelect>
</template>