<script setup lang="ts" generic="T">
import type { SkSelectOptions, SkSelectOptionsEmits, SkSelectSlots } from './sk-select'

const props = defineProps<SkSelectOptions<T>>()
const emits = defineEmits<SkSelectOptionsEmits<T>>()

defineSlots<SkSelectSlots<T>>()

watch(() => props.show, (value) => {
    if (value) {
        emits('onData')
    }
})
</script>

<template>
    <div class="sk-select__options" :class="{ show }">
        <input
            type="text"
            placeholder="Buscar..."
            autofocus
            :value="search"
            @input="emits('update:search', ($event.target as HTMLInputElement).value)"
            class="sk-select__search"
        />
        <ul>
            <li v-for="item in options" @click="$emit('update:value', item)">
                <slot name="option" :item="item">
                    {{ item }}
                </slot>
            </li>
        </ul>
    </div>
</template>