<script setup lang="ts">
const props = defineProps<{
    client: IClient
    radio?: IRadio
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

// data
const radio = ref<IRadio | null>(null)
const radios = ref<IRadio[]>([])

// methods
async function send() {
    await $fetch(`/api/clients/${props.client.code}/radios`, {
        method: 'DELETE',
        body: {
           radios_codes: radios.value.map((radio) => radio.code)
        }
    })

    emits('refresh')
    emits('close')
}

function removeRadio(radio: IRadio) {
    radios.value.splice(radios.value.indexOf(radio), 1)
}

// hooks
watch(radio, (value) => {
    if (value) {
        radios.value.push(value)
        radio.value = null
    }
})

// lifecycle
onMounted(() => {
    if (props.radio) {
        radios.value.push(props.radio)
    }
})
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 500px;">
        <label>Buscar</label>
        <SelectRadio
            :client="client"
            v-model="radio"
        />

        <label>Radios seleccionados</label>
        <ul class="list-radios-form">
            <li v-for="radio in radios">
                {{ radio.imei }}

                <button type="button" @click="removeRadio(radio)">
                    <IconsTrashBin />
                </button>
            </li>
        </ul>

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>