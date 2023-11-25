<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const sim = ref<ISim | null>(null)

onMounted(async () => {
    sim.value = await $fetch(`/api/sims/${props.code}`)
})
</script>

<template>
    <main>
        {{ sim }}
    </main>
</template>