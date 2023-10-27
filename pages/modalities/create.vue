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
    <form @submit.prevent="send">
        <label>Nombre</label>
        <input 
            type="text" 
            v-model="name" 
        />
        <button type="submit">
            Submit
        </button>
    </form>
</template>