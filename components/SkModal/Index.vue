<script setup lang="ts">
const dialog = ref<HTMLDialogElement>()

const emits = defineEmits(['close'])

function open() {
    dialog.value?.showModal()
}

function close() {
    dialog.value?.close()
    emits('close')
}

onMounted(() => {
    open()
})
</script>

<template>
    <dialog ref="dialog" class="sk-modal">
        <button @click="close">X</button>
        <slot />
    </dialog>
</template>