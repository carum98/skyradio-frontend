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