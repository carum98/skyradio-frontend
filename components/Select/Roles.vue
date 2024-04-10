<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<IModality>, 'required'>>()

interface IRole {
    name: string
    value: string
}

const items = [
    { name: 'Administrador', value: 'admin' },
    { name: 'Usuario', value: 'user' },
] as IRole[]

const search = ref('')
const value = defineModel<IRole | null>() 
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