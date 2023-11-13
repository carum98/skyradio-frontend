<script setup lang="ts">
const props = defineProps<{
    radio: IRadio
}>()

const emits = defineEmits<{
    close: []
    update: []
}>()

// data
const client = ref<IClient | null>(null)

// methods
async function send() {
    await $fetch(`/api/radios/${props.radio.code}/clients`, {
        method: 'POST',
        body: {
            client_code: client.value?.code
        }
    })

    emits('update')
    emits('close')
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 300px;">
        <label>Cliente</label>
        <SelectClient 
            v-model="client"
        />

        <button type="submit" class="sk-button">
            Aceptar
        </button>
    </form>
</template>