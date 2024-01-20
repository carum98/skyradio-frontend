<script setup lang="ts">
const dialog = ref<HTMLDialogElement>()

const emits = defineEmits<{
    close: []
}>()

function open() {
    dialog.value?.showModal()
}

function close() {
    dialog.value?.close()
    emits('close')
}

function closeButton() {
    // Create form with dialog method and submit it to close the dialog
    const form = document.createElement('form')
    form.style.display = 'none'
    form.method = 'dialog'
    dialog.value?.appendChild(form)
    form.submit()   
}

onMounted(() => {
    open()

    // Listen when the dialog is closed
    dialog.value?.addEventListener('close', () => setTimeout(close, 550))
})
</script>

<template>
    <dialog ref="dialog" class="sk-modal">
        <button id="close" @click="closeButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"/></svg>
        </button>

        <Suspense>
            <slot />
        </Suspense>
    </dialog>
</template>