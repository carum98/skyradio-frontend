<script setup lang="ts">
const props = defineProps<{
    client?: IClient
}>()

const path = props.client ? `/api/clients/${props.client.code}/radios` : '/api/radios'

const { items, search, onData } = useSelect<IRadio>(path)

const value = defineModel<IRadio | null>() 
</script>

<template>
    <SkSelect
        label="Radios"
        :options="items"
        v-model:value="value"
        v-model:search="search"
        @onData="onData"
    >
        <template #option="{ item }">
            {{ item?.imei }}
        </template>
    </SkSelect>
</template>