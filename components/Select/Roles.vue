<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IModality>, 'required'>>()

const search = ref('')
const value = defineModel<IRole | null>() 
const items = Roles
</script>

<template>
    <SkSelect
        label="Rol"
        :options="items"
        :required="required"
        :loading="false"
        v-model:value="value"
        v-model:search="search"
    >
        <template #option="{ item }">
            {{ item?.name }}
        </template>
    </SkSelect>
</template>