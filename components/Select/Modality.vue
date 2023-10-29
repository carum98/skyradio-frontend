<script setup lang="ts">
// data
const value = ref<IModality | null>(null)
const data = ref<ITable<IModality> | null>(null)

async function onData() {
    data.value = await $fetch<ITable<IModality>>('/api/companies-modality')
}

onMounted(onData)
</script>

<template>
    <SkSelect
        v-if="data"
        :items="data"
        v-model="value"
    />
</template>