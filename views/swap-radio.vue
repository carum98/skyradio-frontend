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
const radio_from = ref<IRadio | null>(null)
const radio_to = ref<IRadio | null>(null)

// methods
async function send() {
    await $fetch(`/api/clients/${props.client.code}/radios`, {
        method: 'PUT',
        body: {
            radio_code_from: radio_from.value?.code,
            radio_code_to: radio_to.value?.code
        }
    })

    emits('refresh')
    emits('close')
}

// lifecycle
onMounted(() => {
    if (props.radio) {
        radio_from.value = props.radio
    }
})
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 300px;">
        <label>Radio a cambiar</label>
        <SelectRadio
            :client="client"
            v-model="radio_from"
        />

        <label>Radio a cambiar por</label>
        <SelectRadio
            v-model="radio_to"
        />

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>