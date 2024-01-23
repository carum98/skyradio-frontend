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
const radios = ref<IRadio[]>([])

// computed
const disabled = computed(() => !radios.value.length)

// methods
async function send() {
    try {
        const addPromise = $fetch(`/api/clients/${props.client.code}/radios`, {
            method: 'DELETE',
            body: {
                radios_codes: radios.value.map((radio) => radio.code)
            }
        })

        const updatePromise = radios.value.map((radio) => $fetch(`/api/radios/${radio.code}`, {
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
            message: 'Devolucion realizada correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al realizar la devolucion'
        })
    }
}

async function addRadio() {
    const value = await picker.open({
        name: 'radios',
        path: `/api/clients/${props.client.code}/radios`,
        filters: {
            'radios[code][not_in]': radios.value.map((radio) => radio.code).toString() || undefined,
        }
    })

    if (value) {
        radios.value.push(value)
    }
}

function removeRadio(radio: IRadio) {
    radios.value.splice(radios.value.indexOf(radio), 1)
}

onMounted(() => {
    if (props.radio) {
        radios.value.push(props.radio)
    }
})
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <ul v-if="radios.length" class="d-flex-column gap-1 mb-1">
            <li v-for="radio in radios">
                <ItemRadio
                    :radio="radio"
                    @remove="removeRadio"
                />
            </li>
        </ul>

        <button class="button-picker" @click.prevent="addRadio">
            Seleccionar Radio
        </button>

        <button type="submit" class="sk-button sk-button--block" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>