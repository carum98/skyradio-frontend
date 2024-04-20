<script setup lang="ts">
type FormState = {
    client: IClient | null
}

const props = defineProps<{
    inital: FormState | null
}>()

const emits = defineEmits<{
    applied: [Record<string, any>, FormState]
}>()

const form = reactive<FormState>({
    client: props.inital?.client ?? null,
})

function onApplied() {
    let query = {
        ['clients[code][equal]']: form.client?.code,
    }

    emits('applied', query, form)
}

watch(form, onApplied, { deep: true })
</script>

<template>
    <form class="sk-form" @submit.prevent style="width: 180px;">
        <label>Cliente</label>
        <SelectClient 
            show-clear
            v-model="form.client"
        />
    </form>
</template>