<script setup lang="ts">
const props = defineProps<{
    onCreated: (data: ISim) => void
}>()

// data
const number = ref('')
const provider = ref<ISimProvider | null>(null)

// methods
async function send() {
    const data = await $fetch<ISim>('/api/sims', {
        method: 'POST',
        body: {
            number: number.value,
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
    <form @submit.prevent="send">
        <label>Nombre</label>
        <input 
            type="text" 
            v-model="number" 
        />
        <label>Proveedor</label>
        <SelectSimProvider 
            v-model="provider"
        />
        <button type="submit">
            Submit
        </button>
    </form>
</template>