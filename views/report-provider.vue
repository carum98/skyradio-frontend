<script setup lang="ts">
const emits = defineEmits<{
    close: []
}>()

// data
const provider = ref<ISimProvider | null>(null)
const format = ref('xlsx')
const loading = ref(false)

// methods
async function send() {
    loading.value = true

    const data = await $fetch(`/api/reports/sims-provider`, {
        method: 'POST',
        body: {
            provider_code: provider.value?.code,
            format: format.value
        }
    })

    dowloadFile({
        data,
        name: `${provider.value?.name}.${format.value}`
    })

    loading.value = false

    emits('close')
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <SelectSimProvider
            v-model="provider"
        />

        <PickerFormat 
            style="margin-top: 1rem;"
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