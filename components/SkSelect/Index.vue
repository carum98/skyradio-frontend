<script setup lang="ts" generic="T">
import type { SkSelectProps, SkSelectEmits, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

const props = defineProps<SkSelectProps<T>>()
const emits = defineEmits<SkSelectEmits<T>>()

const show = ref(false)

const value = computed<T>(() => props.value)

function onSelect(event: T) {
    emits('input', event)
    show.value = false
}
</script>

<template>
    <div class="sk-select">
        <SkSelectInput 
            :label="label"
            :value="value"
            @click.native="show = !show"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectInput>

        <SkSelectOptions 
            :options="options"
            :show="show"
            :value="value"
            @input="onSelect"
            @onData="$emit('onData')"
        >
            <template #option="{ item }">
                <slot name="option" :item="item" />
            </template>
        </SkSelectOptions>
    </div>
</template>