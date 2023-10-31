<script setup lang="ts">
const props = defineProps<{
    onCreated: (data: IRadioModel) => void
}>()

// data
const name = ref('')

// methods
async function send() {
    const data = await $fetch<IRadioModel>('/api/radios-model', {
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
            placeholder="Nombre del modelo"
            v-model="name" 
        />
        <button type="submit" class="sk-button">
            Submit
        </button>
    </form>
</template>