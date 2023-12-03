<script setup lang="ts">
const props = defineProps<{
    anchor: HTMLElement
}>()

const popover = ref<HTMLDialogElement>()

const emits = defineEmits<{
    close: []
}>()

function open() {
    if (!popover.value) return

    popover.value?.showModal()

    // Set the position of the popover
    const anchorRect = props.anchor.getBoundingClientRect()
    const popoverRect = popover.value.getBoundingClientRect()

    popover.value?.style.setProperty('--popover-top', `${anchorRect.bottom}px`)
    popover.value?.style.setProperty('--popover-left', `${anchorRect.left - popoverRect.width + anchorRect.width}px`)
}

function close() {
    popover.value?.close()
    emits('close')
}

onMounted(() => {
    open()

    // Close the popover when the user clicks outside of it
    popover.value?.addEventListener('click', (event) => {
        if (event.target === popover.value) close()
    })

    // Listen when the dialog is closed
    popover.value?.addEventListener('close', () => setTimeout(close, 550))
})
</script>

<template>
    <dialog ref="popover" class="sk-popover">
        <slot />
    </dialog>
</template>