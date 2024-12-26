<script setup lang="ts">
const slideover = ref<HTMLElement>()

const emits = defineEmits<{
    close: []
}>()

function close() {
    emits('close')
}

onMounted(() => {
    slideover.value?.showPopover()

    // Listen when the dialog is closed
    slideover.value?.addEventListener('toggle', (event) => {
        if ((event as ToggleEvent).newState === 'closed') {
            setTimeout(close, 550)
        }
    })
})
</script>

<template>
    <div ref="slideover" popover class="sk-slideover">
        <slot />
    </div>
</template>