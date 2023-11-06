<script setup lang="ts" generic="T">
import type { SkSelectInput, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

const props = defineProps<SkSelectInput<T>>()
</script>

<template>
    <button class="sk-select__input sk-input" :popovertarget="uniqueId" :id="uniqueId + '_anchor'">
        <slot v-if="props.value" name="option" :item="props.value">
            {{ props.value }}
        </slot>
        <span v-else>
            {{ label }}
        </span> 
    </button>
</template>