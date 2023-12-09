<script setup lang="ts">
const props = defineProps<{
    sim: ISim
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePickerRadio('/api/radios?clients[code][is_null]')

// data
const radio = ref<IRadio | null>(null)

// methods
async function send() {
    await $fetch(`/api/sims/${props.sim.code}/radios`, {
        method: 'POST',
        body: {
            radio_code: radio.value?.code
        }
    })

    emits('refresh')
    emits('close')
}

async function addRadio() {
    const value = await picker.open()

    if (value) {
        radio.value = value
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 450px;">
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

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>