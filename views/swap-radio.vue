<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
    client: IClient
    radio?: IRadio
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePicker<IRadio>()

// data
const radio_from = ref<IRadio | null>(null)
const radio_to = ref<IRadio | null>(null)

// computed
const disabled = computed(() => !radio_from.value || !radio_to.value)

// methods
async function pickRadioFrom() {
    const value = await picker.open({
        name: 'radios',
        path: `/api/clients/${props.client.code}/radios`,
    })

    radio_from.value = value
}

async function pickRadioTo() {
    const value = await picker.open({
        name: 'radios',
        path: `/api/radios`,
        filters: {
            'clients[code][is_null]': '',
            'radios_status[code][is_null]': '',
        }
    })

    radio_to.value = value
}

async function send() {
    try {
        const addPromise = $fetch(`/api/clients/${props.client.code}/radios`, {
            method: 'PUT',
            body: {
                radio_code_from: radio_from.value?.code,
                radio_code_to: radio_to.value?.code
            }
        })

        const updatePromise = [
            toRaw(radio_from.value) as IRadio, 
            toRaw(radio_to.value) as IRadio
        ].map((radio) => $fetch(`/api/radios/${radio.code}`, {
            method: 'PUT',
            body: {
                name: radio.name,
                sim_code: radio.sim?.code
            }
        }))

        await Promise.allSettled([
            addPromise, 
            ...updatePromise
        ])

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Cambio realizado correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al realizar el cambio'
        })
    }
}

// lifecycle
onMounted(() => {
    if (props.radio) {
        radio_from.value = props.radio
    }
})
</script>

<template>
    <form class="sk-form d-flex-column" @submit.prevent="send" style="gap: 15px;">
        <ItemRadio
            v-if="radio_from"
            :radio="radio_from"
            @remove="radio_from = null"
        />
        <button v-else class="button-picker" @click.prevent="pickRadioFrom">
            Seleccionar Radio
        </button>

        <svg style="margin: auto;" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 9l4-4l4 4M7 5v14m14-4l-4 4l-4-4m4 4V5"/></svg>

        <ItemRadio
            v-if="radio_to"
            :radio="radio_to"
            @remove="radio_to = null"
        />
        <button v-else class="button-picker" @click.prevent="pickRadioTo">
            Seleccionar Radio
        </button>

        <button type="submit" class="sk-button sk-button--block" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>