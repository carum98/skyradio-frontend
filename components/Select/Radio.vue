<script setup lang="ts">
import type { SkSelectProps } from '../SkSelect/sk-select'

const props = defineProps<{
    client?: IClient
} & Pick<SkSelectProps<IRadio>, 'required'>>()

const path = props.client ? `/api/clients/${props.client.code}/radios` : '/api/radios'

const { items, search, onData } = useSelect<IRadio>(path)

const value = defineModel<IRadio | null>() 
</script>

<template>
    <SkSelect
        label="Radios"
        :options="items"
        :required="required"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.imei }}
        </template>
    </SkSelect>
</template>