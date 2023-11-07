<script setup lang="ts">
const props = defineProps<{
    onCreated: (data: IRadioStatus) => void
}>()

// data
const name = ref('')

// methods
async function send() {
    const data = await $fetch<IRadioStatus>('/api/radios-status', {
        method: 'POST',
        body: {
            name: name.value,
        },
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(data)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Nombre del estado"
            autofocus
            v-model="name" 
        />
        <button type="submit" class="sk-button">
            Crear
        </button>
    </form>
</template>