<script setup lang="ts" generic="T">
import type { SkSelectInput, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

const props = defineProps<SkSelectInput<T>>()

const value = computed<T>(() => props.value)
</script>

<template>
    <div class="sk-select__input sk-input">
        <slot v-if="value" name="option" :item="value">
            {{ value }}
        </slot>
        <span v-else>
            {{ label }}
        </span> 
    </div>
</template>