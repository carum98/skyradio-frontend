<script setup lang="ts">
type FormState = {
    model: IRadioModel | null
    provider: ISimProvider | null
    status: IRadioStatus | null
    client: IClient | null
}

const props = defineProps<{
    inital: FormState | null
}>()

const emits = defineEmits<{
    applied: [Record<string, any>, FormState]
}>()

const form = reactive<FormState>({
    model: props.inital?.model ?? null,
    provider: props.inital?.provider ?? null,
    status: props.inital?.status ?? null,
    client: props.inital?.client ?? null,
})

function onApplied() {
    let query = {
        ['radios_model[code][equal]']: form.model?.code,
        ['sims_provider[code][equal]']: form.provider?.code,
        ['radios_status[code][equal]']: form.status?.code,
        ['clients[code][equal]']: form.client?.code,
    }

    emits('applied', query, form)
}

watch(form, onApplied, { deep: true })
</script>

<template>
    <form class="sk-form" @submit.prevent style="width: 180px;">
        <label>Modelo</label>
        <SelectRadioModel 
            show-clear
            v-model="form.model" 
        />

        <label>Proveedor</label>
        <SelectSimProvider 
            show-clear
            v-model="form.provider" 
        />

        <label>Estado</label>
        <SelectStatus
            show-clear
            v-model="form.status"
        />

        <label>Cliente</label>
        <SelectClient 
            show-clear
            v-model="form.client"
        />
    </form>
</template>