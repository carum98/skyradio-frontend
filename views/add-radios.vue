<script setup lang="ts">
const props = defineProps<{
    client: IClient
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
    const addPromise = $fetch(`/api/clients/${props.client.code}/radios`, {
        method: 'POST',
        body: {
           radios_codes: radios.value.map((radio) => radio.code)
        }
    })

    const updatePromise = radios.value.map((radio) => $fetch(`/api/radios/${radio.code}`, {
        method: 'PUT',
        body: {
            name: radio.name,
            sim_code: radio.sim?.code
        }
    }))

    await Promise.allSettled([
        addPromise, 
        ...updatePromise
    ])

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
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 750px;">
        <SelectRadio 
            v-model="radio"
        />

        <ul class="list-radios-form">
            <li v-for="radio in radios" class="add-radio-item">
                <input
                    type="text"
                    class="sk-input"
                    placeholder="Nombre del radio"
                    v-model="radio.name" 
                />

                {{ radio.imei }}

                <span v-if="radio.model" class="sk-link">
                    <span class="badge-color" :style="{ backgroundColor: radio.model.color }"></span>
                    {{ radio.model.name }}
                </span>

                <SelectSim
                    v-model="radio.sim"
                />

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

<style>
.add-radio-item {
    display: grid !important;
    grid-template-columns: 235px 1fr 70px 1fr 35px;
    gap: 20px;
}
</style>