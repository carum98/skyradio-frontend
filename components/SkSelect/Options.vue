<script setup lang="ts" generic="T">
import type { SkSelectOptions, SkSelectOptionsEmits, SkSelectSlots } from './sk-select'

defineSlots<SkSelectSlots<T>>()

defineProps<SkSelectOptions<T>>()
const emits = defineEmits<SkSelectOptionsEmits<T>>()
const attrs = useAttrs()

// data
const input = ref<HTMLInputElement | null>(null)
const popover = ref<HTMLElement | null>(null)
const id = attrs['data-id'] as string

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
            if (!("anchorName" in document.documentElement.style)) {
                cssAnchorPosition(event as ToggleEvent)
            }

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
        :id="id"
        :anchor="id + '_anchor'"
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