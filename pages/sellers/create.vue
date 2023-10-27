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