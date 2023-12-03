<script setup lang="ts">
const emits = defineEmits<{
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
}

watch(form, onApplied, { deep: true })
</script>

<template>
    <form class="sk-form" @submit.prevent style="width: 180px;">
        <label>Modalidad</label>
        <SelectModality 
            v-model="form.modality" 
        />

        <label>Vendedor</label>
        <SelectSeller 
            v-model="form.seller" 
        />
    </form>
</template>