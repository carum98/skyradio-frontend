<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const provider = ref<ISimProvider | null>(null)

onMounted(async () => {
    provider.value = await $fetch(`/api/sims-provider/${props.code}`)
})
</script>

<template>
    <main>
        {{ provider }}
    </main>
</template>