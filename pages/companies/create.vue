<script setup lang="ts">
const props = defineProps<{
    onCreated: (client: IClient) => void
}>()

// data
const name = ref('')
const modality = ref<IModality | null>(null)
const seller = ref<ISeller | null>(null)

// methods
async function send() {
    const client = await $fetch<IClient>('/api/clients', {
        method: 'POST',
        body: {
            name: name.value,
            modality_code: modality.value?.code,
            seller_code: seller.value?.code
        },
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(client)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Nombre de la Compañía"
            autofocus
            v-model="name" 
        />
        <label>Modalidad</label>
        <SelectModality 
            v-model="modality" 
        />
        <label>Vendedor</label>
        <SelectSeller 
            v-model="seller" 
        />
        <button type="submit" class="sk-button">
            Crear
        </button>
    </form>
</template>