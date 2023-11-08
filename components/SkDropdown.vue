<script setup lang='ts'>
defineProps<{
    options: {
        key: string
        label: string
        icon: string
        color: string
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
        <button 
            v-for="option in options" 
            :key="option.key" 
            @click="option.action"
            :style="{ '--color': option.color }"
            class="button-actions"
        >
            <span v-html="option.icon"></span>
            {{ option.label }}
        </button>
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
    width: 180px;
    padding: 15px;
    top: anchor(bottom);
    right: anchor(right);

    > button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 15px;
        border-radius: 15px;
        font-size: 15px;

        &:not(:last-child) {
            margin-bottom: 15px;
        }

        > span {
            height: 24px;
        }
    }
}
</style>