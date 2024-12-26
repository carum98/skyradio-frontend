<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
    radio: IRadio
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePicker<IRadioStatus>()

// data
const status = ref<IRadioStatus | null>(props.radio.status)

// computed
const disabled = computed(() => !status.value)

// methods
async function send() {
    try {
        await $fetch(`/api/radios/${props.radio.code}`, {
            method: 'PUT',
            body: {
                status_code: status.value?.code
            }
        })

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Estado actualizado correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al actualizar el estado'
        })
    }
}

async function addStatus() {
    const value = await picker.open({
        name: 'status',
        path: '',
        value: props.radio.status
    })

    if (value) {
        status.value = value
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <ItemStatus
            v-if="status"
            :status="status"
            @remove="status = null"
        />

        <button v-else class="button-picker" @click.prevent="addStatus">
            Seleccionar Estado
        </button>

        <button type="submit" class="sk-button" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>