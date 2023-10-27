<script setup lang="ts">
const props = defineProps<{
    onCreated: (data: ISimProvider) => void
}>()

// data
const name = ref('')

// methods
async function send() {
    const data = await $fetch<ISimProvider>('/api/sims-provider', {
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