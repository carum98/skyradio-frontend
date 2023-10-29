<script setup lang="ts">
const props = defineProps<{
    onCreated: (company: ICompany) => void
}>()

// data
const name = ref('')
const modality = ref<IModality | null>(null)
const seller = ref<ISeller | null>(null)

// methods
async function send() {
    const company = await $fetch<ICompany>('/api/companies', {
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

    props.onCreated(company)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Nombre de la Compañía"
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
            Submit
        </button>
    </form>
</template>