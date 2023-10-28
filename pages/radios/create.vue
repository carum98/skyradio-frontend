<script setup lang="ts">
const props = defineProps<{
    onCreated: (data: IRadio) => void
}>()

// data
const name = ref('')
const imei = ref('')
const serial = ref('')
const model = ref<IRadioModel | null>(null)

// methods
async function send() {
    const data = await $fetch<IRadio>('/api/radios', {
        method: 'POST',
        body: {
            name: name.value,
            imei: imei.value,
            serial: serial.value,
            model_code: model.value?.code,
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
        <label>IMEI</label>
        <input 
            type="text" 
            v-model="imei"
        />
        <label>Serial</label>
        <input 
            type="text" 
            v-model="serial"
        />
        <label>Modelo</label>
        <SelectRadioModel
            v-model="model"
        />
        <button type="submit">
            Submit
        </button>
    </form>
</template>