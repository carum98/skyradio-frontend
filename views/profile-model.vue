<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const model = ref<IRadioModel | null>(null)

onMounted(async () => {
    model.value = await $fetch(`/api/radios-model/${props.code}`)
})
</script>

<template>
    <main>
        {{ model }}
    </main>
</template>