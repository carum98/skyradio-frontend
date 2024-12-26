<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'
defineProps<Pick<SkSelectProps<ILicense>, 'required' | 'showClear'>>()

const { items, search, onData, loading } = useSelect<ILicense>('/api/licenses')

const value = defineModel<ILicense | null>() 

async function onCreate(key: string) {
    value.value = await $fetch('/api/licenses', {
        method: 'POST',
        body: JSON.stringify({ key }),
    })
}
</script>

<template>
    <SkSelect
        label="Licencia"
        :options="items"
        :required="required"
        :loading="loading"
        :show-clear="showClear"
        enable-create
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
        @onCreate="onCreate"
    >
        <template #option="{ item }">
            {{ item?.key }}

            <span 
                v-if="item?.is_active !== undefined"
                class="badge-color" 
                :style="{ backgroundColor: item?.is_active ? 'green' : 'red' }"
            ></span>
        </template>
    </SkSelect>
</template>