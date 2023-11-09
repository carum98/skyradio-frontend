<script setup lang="ts">
const props = defineProps<{
    onCreated: (client: IModality) => void
}>()

// data
const name = ref('')

// methods
async function send() {
    const client = await $fetch<IModality>('/api/clients-modality', {
        method: 'POST',
        body: {
            name: name.value,
        },
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(client)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Nombre de la Modalidad"
            autofocus
            v-model="name" 
        />
        <button type="submit" class="sk-button">
            Crear
        </button>
    </form>
</template>