<script setup lang="ts">
type FormState = {
    provider: ISimProvider | null
    client: IClient | null
}

const props = defineProps<{
    inital: FormState | null
}>()

const emits = defineEmits<{
    applied: [Record<string, any>, FormState]
}>()

const form = reactive<FormState>({
    provider: props.inital?.provider ?? null,
    client: props.inital?.client ?? null,
})

function onApplied() {
    let query = {
        ['sims_provider[code][equal]']: form.provider?.code,
        ['clients[code][equal]']: form.client?.code,
    }

    emits('applied', query, form)
}

watch(form, onApplied, { deep: true })
</script>

<template>
    <form class="sk-form" @submit.prevent style="width: 180px;">
        <label>Proveedor</label>
        <SelectSimProvider 
            show-clear
            v-model="form.provider" 
        />

        <label>Cliente</label>
        <SelectClient 
            show-clear
            v-model="form.client"
        />
    </form>
</template>