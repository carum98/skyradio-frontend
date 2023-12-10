<script setup lang="ts">
const props = defineProps<{
    client: IClient
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

const picker = usePicker<IRadio>()

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
    const value = await picker.open({
        name: 'radios',
        path: '/api/radios',
        filters: {
            'radios[code][not_in]': radios.value.map((radio) => radio.code).toString() || undefined,
            'clients[code][is_null]': '',
        }
    })

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
        <ul v-if="radios.length" class="d-flex-column gap-1 mb-1">
            <li v-for="radio in radios">
                <ItemRadio
                    :radio="radio"
                    @remove="removeRadio"
                />
            </li>
        </ul>

        <button class="button-picker" @click.prevent="addRadio">
            Seleccionar Radio
        </button>

        <button type="submit" class="sk-button sk-button--block">
            Aceptar
        </button>
    </form>
</template>
