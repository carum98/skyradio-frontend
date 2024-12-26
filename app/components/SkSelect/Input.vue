<script setup lang="ts" generic="T">
import type { SkSelectInput, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()
defineProps<SkSelectInput<T>>()

const attrs = useAttrs()
const id = attrs['data-id'] as string
</script>

<template>
    <button 
        type="button" 
        class="sk-select__input sk-input" 
        :popovertarget="id" 
        :id="id + '_anchor'"
        :style="`anchor-name: --${id}`"
    >
        <slot v-if="value" name="option" :item="(value as T)">
            {{ value }}
        </slot>
        <span v-else>
            {{ label }}
        </span>
    </button>
</template>