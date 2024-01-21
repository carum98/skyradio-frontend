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

        <div v-if="loading" class="sk-select__loading">
            <svg width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
        </div>

        <ul>
            <li v-for="item in options" @click="onSelect(item)">
                <slot name="option" :item="item">
                    {{ item }}
                </slot>
            </li>
        </ul>
    </div>
</template>