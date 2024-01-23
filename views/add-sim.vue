<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
    radio: IRadio
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
            method: 'POST',
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
            'sims[code][not_in]': sim.value?.code || undefined,
            'clients[code][is_null]': '',
        }
    })

    if (value) {
        sim.value = value
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <ItemSim
            v-if="sim"
            :sim="sim"
            @remove="sim = null"
        />

        <button v-else class="button-picker" @click="addSim">
            Seleccionar SIM
        </button>

        <button type="submit" class="sk-button" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>