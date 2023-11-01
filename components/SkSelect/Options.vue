<script setup lang="ts" generic="T">
import type { SkSelectOptions, SkSelectOptionsEmits, SkSelectSlots } from './sk-select'

const props = defineProps<SkSelectOptions<T>>()
const emits = defineEmits<SkSelectOptionsEmits<T>>()

defineSlots<SkSelectSlots<T>>()

const search = defineModel<string>('search')

watch(() => props.show, (value) => {
    if (value) {
        emits('onData')
    }
})
</script>

<template>
    <div class="sk-select__options" :class="{ show }">
        <input
            v-model="search"
            type="text"
            placeholder="Buscar..."
        />
        <ul>
            <li v-for="item in options">
                <slot name="option" :item="item">
                    {{ item }}
                </slot>
            </li>
        </ul>
    </div>
</template>