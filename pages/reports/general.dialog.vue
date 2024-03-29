<script setup lang="ts">
const emits = defineEmits<{
    close: []
}>()

// data
const loading = ref(false)

// methods
async function send() {
    loading.value = true

    const data = await $fetch(`/api/reports/general`, {
        method: 'POST',
    })

    dowloadFile({
        data,
        name: `general.xlsx`
    })

    loading.value = false

    emits('close')
}

</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <button type="submit" class="sk-button sk-button--icon" :disabled="loading">
            <IconsLoadingAnimated v-if="loading" />
            {{ loading ? 'Generando...' : 'Generar' }}
        </button>
    </form>
</template>