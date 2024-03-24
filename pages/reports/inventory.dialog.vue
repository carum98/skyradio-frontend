<script setup lang="ts">
const emits = defineEmits<{
    close: []
}>()

// data
const format = ref('xlsx')
const loading = ref(false)

// methods
async function send() {
    loading.value = true

    const data = await $fetch(`/api/reports/inventory`, {
        method: 'POST',
        body: {
            format: format.value
        }
    })

    dowloadFile({
        data,
        name: `inventory.${format.value}`
    })

    loading.value = false

    emits('close')
}

</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <PickerFormat 
            v-model="format" 
            :disabled="loading"
            dense
        />

        <button type="submit" class="sk-button sk-button--icon" :disabled="loading">
            <IconsLoadingAnimated v-if="loading" />
            {{ loading ? 'Generando...' : 'Generar' }}
        </button>
    </form>
</template>