<script setup lang="ts">
const props = defineProps<{
    client: IClient
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePickerRadio('/api/radios')

// data
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

async function addRadio() {
    const value = await picker.open()

    if (value) {
        radios.value.push(value)
    }
}

function removeRadio(radio: IRadio) {
    radios.value.splice(radios.value.indexOf(radio), 1)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 750px;">
        <ul v-if="radios.length" class="list-radios-form mb-1">
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

        <button class="button-picker" @click.prevent="addRadio">
            Seleccionar Radio
        </button>

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

.button-picker {
    --color: rgba(177, 177, 177, 0.301);

    width: 100%;
    height: 70px;
    font-size: 18px;
    color: var(--color);
    background-color: var(--table-color);
    opacity: 0.9;
    border-radius: 15px;
    text-align: center;
    border: 2px dashed var(--color);
    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        opacity: 0.7;
    }
}
</style>