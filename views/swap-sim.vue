<script setup lang="ts">
const props = defineProps<{
    radio: IRadio
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

// data
const sim = ref<ISim | null>(null)

// methods
async function send() {
    await $fetch(`/api/radios/${props.radio.code}/sims`, {
        method: 'PUT',
        body: {
            sim_code: sim.value?.code
        }
    })

    emits('refresh')
    emits('close')
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 300px;">
        <label>Sim</label>
        <SelectSim 
            v-model="sim"
        />

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>