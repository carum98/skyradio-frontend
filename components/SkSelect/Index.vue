<script setup lang="ts" generic="T">
import type { SkSelectProps, SkSelectEmits, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

const props = defineProps<SkSelectProps<T>>()
const emits = defineEmits<SkSelectEmits<T>>()

const show = ref(false)

const valueC = computed<T>(() => props.value)

function onSelect(event: T) {
    emits('update:value', event)
    show.value = false
}
</script>

<template>
    <div class="sk-select">
        <SkSelectInput 
            :label="label"
            :value="valueC"
            @click.native="show = !show"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectInput>

        <SkSelectOptions 
            :options="options"
            :show="show"
            :value="valueC"
            :search="search"
            @update:value="onSelect"
            @update:search="$emit('update:search', $event)"
            @onData="$emit('onData')"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectOptions>
    </div>
</template>