<script setup lang="ts">
const props = defineProps<{
    onCreated: (data: ISim) => void
}>()

// data
const number = ref('')
const serial = ref('')
const provider = ref<ISimProvider | null>(null)

// methods
async function send() {
    const data = await $fetch<ISim>('/api/sims', {
        method: 'POST',
        body: {
            number: number.value,
            serial: serial.value,
            provider_code: provider.value?.code,
        },
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(data)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Número de la sim"
            autofocus
            v-model="number" 
        />
        <label>Serial</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Número de serie"
            v-model="serial"
        />
        <label>Proveedor</label>
        <SelectSimProvider 
            v-model="provider"
        />
        <button type="submit" class="sk-button">
            Crear
        </button>
    </form>
</template>