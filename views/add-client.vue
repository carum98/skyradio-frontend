<script setup lang="ts">
const toast = useToast()

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

// computed
const disabled = computed(() => !client.value)

// methods
async function send() {
    try {
        await $fetch(`/api/radios/${props.radio.code}/clients`, {
            method: 'POST',
            body: {
                client_code: client.value?.code
            }
        })

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Entrega realizada correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al realizar la entrega'
        })
    }
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

        <button type="submit" class="sk-button" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>