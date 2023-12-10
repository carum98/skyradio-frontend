<script setup lang="ts">
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

// methods
async function send() {
    await $fetch(`/api/radios/${props.radio.code}/sims`, {
        method: 'POST',
        body: {
            sim_code: sim.value?.code
        }
    })

    emits('refresh')
    emits('close')
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
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <ItemSim
            v-if="sim"
            :sim="sim"
            @remove="sim = null"
        />

        <button v-else class="button-picker" @click="addSim">
            Seleccionar SIM
        </button>

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>