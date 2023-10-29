<script setup lang="ts">
const props = defineProps<{
    onCreated: (company: ISeller) => void
}>()

// data
const name = ref('')

// methods
async function send() {
    const company = await $fetch<ISeller>('/api/companies-seller', {
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
            placeholder="Nombre del Vendedor"
            v-model="name" 
        />
        <button type="submit" class="sk-button">
            Submit
        </button>
    </form>
</template>