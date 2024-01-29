<script setup lang="ts" generic="T">
import type { SkSelectProps, SkSelectEmits, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

const props = defineProps<SkSelectProps<T>>()
const emits = defineEmits<SkSelectEmits<T>>()

// data
const uniqueId = `sk-select-${Math.random().toString(36).substr(2, 9)}`

// methods
function onSelect(event: T | null) {
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
        <input 
            style="display: none;"
            :value="props.value" 
            :required="props.required"
        />

        <SkSelectInput 
            :data-id="uniqueId"
            :label="label"
            :value="props.value"
            :show-clear="props.showClear"
            @onClear="onSelect(null)"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectInput>

        <button 
            v-if="showClear && value"
            class="sk-select__input--clear"
            type="button"
            @click.stop="onSelect(null)"
        >
            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7 17M7 7l10 10"/></svg>
        </button>

        <SkSelectOptions 
            :data-id="uniqueId"
            :options="options"
            :value="props.value"
            :search="search"
            :loading="loading"
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