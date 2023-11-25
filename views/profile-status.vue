<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const status = ref<IRadioStatus | null>(null)

onMounted(async () => {
    status.value = await $fetch(`/api/radios-status/${props.code}`)
})
</script>

<template>
    <main>
        {{ status }}
    </main>
</template>