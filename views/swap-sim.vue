<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
    radio: IRadio
    simOld: ISim
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePicker<ISim>()

// data
const sim = ref<ISim | null>(null)

// computed
const disabled = computed(() => !sim.value)

// methods
async function send() {
    try {
        await $fetch(`/api/radios/${props.radio.code}/sims`, {
            method: 'PUT',
            body: {
                sim_code: sim.value?.code
            }
        })

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'SIM relacionado correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al relacionar el SIM'
        })
    }
}

async function addSim() {
    const value = await picker.open({
        name: 'sims',
        path: '/api/sims',
        filters: {
            'sims[code][not_in]': props.simOld.code,
            'clients[code][is_null]': '',
        }
    })

    if (value) {
        sim.value = value
    }
}
</script>

<template>
    <form class="sk-form d-flex-column" @submit.prevent="send" style="width: 300px; gap: 15px;">
        <ItemSim 
            :sim="simOld" 
            hideRemove
        />

        <svg style="margin: auto;" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 9l4-4l4 4M7 5v14m14-4l-4 4l-4-4m4 4V5"/></svg>

        <ItemSim
            v-if="sim"
            :sim="sim"
            @remove="sim = null"
        />

        <button v-else class="button-picker" @click.prevent="addSim">
            Seleccionar SIM
        </button>

        <button type="submit" class="sk-button" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>