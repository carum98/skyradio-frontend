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

function onCreate() {
    emits('onCreate', (input.value as HTMLInputElement).value)
    onSelect(null)
}

// lifecycle
onMounted(() => {
    popover.value?.addEventListener('toggle', (event: Event) => {
        let { newState } = event as ToggleEvent

        if (newState === 'open') {
            // if (!("anchorName" in document.documentElement.style)) {
                cssAnchorPosition(event as ToggleEvent)
            // }

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

        <div 
            v-if="loading" 
            class="sk-select__loading"
        >
            <svg width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
        </div>

        <button 
            v-if="enableCreate && !loading && options.length === 0"
            class="sk-select__create"
            type="button"
            @click="onCreate"
        >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.387T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95zm0-3v1V5v6.075V11zm2-1h4.075q.075-.525.238-1.025t.362-.975H7zm0-4h6.1q.8-.75 1.788-1.25T17 11.075V11H7zm0-4h10V7H7zm11 14q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23m-.5-2h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5z"/></svg>
            Crear...
        </button>

        <ul>
            <li v-for="item in options" @click="onSelect(item)">
                <slot name="option" :item="item">
                    {{ item }}
                </slot>
            </li>
        </ul>
    </div>
</template>