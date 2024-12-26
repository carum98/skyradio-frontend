<script setup lang="ts">
type FormState = {
    modality: IModality | null,
    seller: ISeller | null,
}

const props = defineProps<{
    inital: FormState | null
}>()

const emits = defineEmits<{
    applied: [Record<string, any>, FormState]
}>()

const form = reactive<FormState>({
    modality: props.inital?.modality ?? null,
    seller: props.inital?.seller ?? null,
})

function onApplied() {
    let query = {
        ['clients_modality[code][equal]']: form.modality?.code,
        ['sellers[code][equal]']: form.seller?.code,
    }

    emits('applied', query, form)
}

watch(form, onApplied, { deep: true })
</script>

<template>
    <form class="sk-form" @submit.prevent style="width: 180px;">
        <label>Modalidad</label>
        <SelectModality 
            show-clear
            v-model="form.modality" 
        />

        <label>Vendedor</label>
        <SelectSeller 
            show-clear
            v-model="form.seller" 
        />
    </form>
</template>