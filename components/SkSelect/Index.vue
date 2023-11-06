<script setup lang="ts" generic="T">
import type { SkSelectProps, SkSelectEmits, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

const props = defineProps<SkSelectProps<T>>()
const emits = defineEmits<SkSelectEmits<T>>()

// data
const uniqueId = `sk-select-${Math.random().toString(36).substr(2, 9)}`

// methods
function onSelect(event: T) {
    emits('update:value', event)
}

function onSearch(event: string) {
    emits('update:search', event)
}

function onData() {
    emits('onData')
}
</script>

<template>
    <div class="sk-select">
        <SkSelectInput 
            :label="label"
            :value="props.value"
            :uniqueId="uniqueId"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectInput>

        <SkSelectOptions 
            :options="options"
            :value="props.value"
            :search="search"
            :uniqueId="uniqueId"
            @update:value="onSelect"
            @update:search="onSearch"
            @onData="onData"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectOptions>
    </div>
</template>