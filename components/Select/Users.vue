<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IUser>, 'required' | 'showClear'>>()

const { items, search, onData, loading } = useSelect<IUser>('/api/users')

const value = defineModel<IUser | null>() 
</script>

<template>
    <SkSelect
        label="Usuario"
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