<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
    sim: ISim
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePicker<IRadio>()

// data
const radio = ref<IRadio | null>(null)

// computed
const disabled = computed(() => !radio.value)

// methods
async function send() {
    try {        
        await $fetch(`/api/sims/${props.sim.code}/radios`, {
            method: 'POST',
            body: {
                radio_code: radio.value?.code
            }
        })

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Radio relacionado correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al relacionar el radio'
        })
    }
}

async function addRadio() {
    const value = await picker.open({
        name: 'radios',
        path: '/api/radios',
        filters: {
            'radios[code][not_in]': radio.value?.code || undefined,
            'clients[code][is_null]': '',
            'radios_status[code][is_null]': '',
        }
    })

    if (value) {
        radio.value = value
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <ItemRadio
            v-if="radio"
            :radio="radio"
            @remove="radio = null"
            hideName
            hideSim
        />

        <button v-else class="button-picker" @click.prevent="addRadio">
            Seleccionar Radio
        </button>

        <button type="submit" class="sk-button" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>