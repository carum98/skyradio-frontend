<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const radio = ref<IRadio | null>(null)

onMounted(async () => {
    radio.value = await $fetch(`/api/radios/${props.code}`)
})
</script>

<template>
    <main>
        {{ radio }}
    </main>
</template>