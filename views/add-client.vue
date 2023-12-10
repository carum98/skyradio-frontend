<script setup lang="ts">
const props = defineProps<{
    radio: IRadio
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePicker<IClient>()

// data
const client = ref<IClient | null>(null)

// methods
async function send() {
    await $fetch(`/api/radios/${props.radio.code}/clients`, {
        method: 'POST',
        body: {
            client_code: client.value?.code
        }
    })

    emits('refresh')
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

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>