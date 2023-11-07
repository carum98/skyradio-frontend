<script setup lang='ts'>
defineProps<{
    options: {
        key: string
        label: string
        action: Function
    }[]
}>()

// data
const id = `dropdown-${Math.random().toString(36).substr(2, 9)}`
const dropdown = ref<HTMLElement | null>(null)

// lifecycle
onMounted(() => {
    dropdown.value?.addEventListener('toggle', (event: Event) => {
        let { newState } = event as ToggleEvent

        if (newState === 'open') {
            if (!("anchorName" in document.documentElement.style)) {
                cssAnchorPosition(event as ToggleEvent)
            }
        }
    })
})
</script>

<template>
    <button
        class="sk-dropdown__button"
        :popovertarget="id"
        :id="id + '_anchor'"
        @click.stop
    >
        <svg width="17" height="17" viewBox="0 0 256 256"><path fill="currentColor" d="M156 128a28 28 0 1 1-28-28a28 28 0 0 1 28 28Zm-28-52a28 28 0 1 0-28-28a28 28 0 0 0 28 28Zm0 104a28 28 0 1 0 28 28a28 28 0 0 0-28-28Z"/></svg>
    </button>

    <div 
        ref="dropdown"
        class="sk-dropdown__options"
        popover
        :anchor="id + '_anchor'"
        :id="id"
        @click.stop
    >
        <ul>
            <li v-for="option in options" :key="option.key" @click="option.action">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.sk-dropdown__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #0a4a9b63;
    border-radius: 10px;
}

.sk-dropdown__options {
    top: anchor(bottom);
    right: anchor(right);
}
</style>