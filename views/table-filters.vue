<script setup lang="ts">
const emits = defineEmits<{
    close: []
    applied: [Record<string, any>]
}>()

const form = reactive({
    modality: null,
    seller: null,
}) as {
    modality: IModality | null,
    seller: ISeller | null,
}

function onApplied() {
    let query = {
        ['clients_modality[code][equal]']: form.modality?.code,
        ['sellers[code][equal]']: form.seller?.code,
    }

    emits('applied', query)
    emits('close')
}
</script>

<template>
    <form class="sk-form" @submit.prevent="onApplied" style="width: 180px;">
        <label>Modalidad</label>
        <SelectModality 
            v-model="form.modality" 
        />

        <label>Vendedor</label>
        <SelectSeller 
            v-model="form.seller" 
        />

        <button type="submit" class="sk-button">
            Aplicar
        </button>
    </form>
</template>