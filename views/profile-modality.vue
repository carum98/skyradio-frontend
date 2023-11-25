<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const modality = ref<IModality | null>(null)

onMounted(async () => {
    modality.value = await $fetch(`/api/clients-modality/${props.code}`)
})
</script>

<template>
    <main>
        {{ modality }}
    </main>
</template>