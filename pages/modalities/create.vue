<script setup lang="ts">
const props = defineProps<{
    onCreated: (company: IModality) => void
}>()

// data
const name = ref('')

// methods
async function send() {
    const company = await $fetch<IModality>('/api/companies-modality', {
        method: 'POST',
        body: {
            name: name.value,
        },
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(company)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Nombre de la Modalidad"
            v-model="name" 
        />
        <button type="submit" class="sk-button">
            Submit
        </button>
    </form>
</template>