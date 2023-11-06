<script setup lang="ts" generic="T">
import type { SkSelectOptions, SkSelectOptionsEmits, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

defineProps<SkSelectOptions<T>>()
const emits = defineEmits<SkSelectOptionsEmits<T>>()

// data
const input = ref<HTMLInputElement | null>(null)
const popover = ref<HTMLElement | null>(null)

// methods
function onSelect(event: T) {
    emits('update:value', event)

    popover.value?.togglePopover()
}

function onSearch(event: Event) {
    emits('update:search', (event.target as HTMLInputElement).value)
}

// lifecycle
onMounted(() => {
    popover.value?.addEventListener('toggle', (event: Event) => {
        let { newState } = event as ToggleEvent

        if (newState === 'open') {
            emits('onData')

            nextTick(() => input.value?.focus())
        }
    })
})
</script>

<template>
    <div
        ref="popover"
        class="sk-select__options"
        popover 
        :id="uniqueId"
        :anchor="uniqueId + '_anchor'"
    >
        <input
            ref="input"
            type="text"
            placeholder="Buscar..."
            :value="search"
            @input="onSearch"
            class="sk-select__search"
        />
        <ul>
            <li v-for="item in options" @click="onSelect(item)">
                <slot name="option" :item="item">
                    {{ item }}
                </slot>
            </li>
        </ul>
    </div>
</template>