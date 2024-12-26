<script setup lang="ts">
const props = defineProps<{
    client: IClient
}>()

const emits = defineEmits<{
    close: []
}>()

// data
const format = ref('xlsx')
const loading = ref(false)

// methods
async function onSubmitted() {
    try {
        loading.value = true

        const data = await $fetch(`/api/reports/clients`, {
            method: 'POST',
            body: {
                client_code: props.client.code,
                format: format.value
            }
        })

        dowloadFile({
            data,
            name: `${props.client.name}.${format.value}`
        })

        emits('close')
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
        emits('close')
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="onSubmitted">
        <PickerFormat 
            v-model="format" 
            :disabled="loading"
        />

        <button type="submit" class="sk-button sk-button--icon" :disabled="loading">
            <svg v-if="loading" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"/></path><path stroke-dasharray="30" stroke-dashoffset="30" d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.3s" values="30;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"/></path></g></svg>
            {{ loading ? 'Exportando...' : 'Exportar' }}
        </button>
    </form>
</template>