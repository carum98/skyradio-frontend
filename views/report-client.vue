<script setup lang="ts">
const emits = defineEmits<{
    close: []
}>()

const picker = usePicker<IClient>()

// data
const client = ref<IClient | null>(null)
const format = ref('xlsx')
const loading = ref(false)

// methods
async function send() {
    loading.value = true

    const data = await $fetch(`/api/clients/${client.value?.code}/export`, {
        method: 'POST',
        body: {
            format: format.value
        }
    })

    dowloadFile({
        data,
        name: `${client.value?.name}.${format.value}`
    })

    loading.value = false

    emits('close')
}

async function addSim() {
    const value = await picker.open({
        name: 'clients',
        path: '/api/clients'
    })

    if (value) {
        client.value = value
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <ItemClient
            v-if="client"
            :client="client"
            @remove="client = null"
        />

        <button v-else class="button-picker" @click.prevent="addSim">
            Seleccionar Cliente
        </button>

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