<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<ISimProvider>, 'required' | 'showClear'>>()

const { items, search, onData, loading } = useSelect<ISimProvider>('/api/sims-provider')

const value = defineModel<ISimProvider | null>() 
</script>

<template>
    <SkSelect
        label="Provedor"
        :options="items"
        :required="required"
        :loading="loading"
        :show-clear="showClear"
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