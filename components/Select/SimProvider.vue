<script setup lang="ts">
// data
const value = ref<ISimProvider | null>(null)
const data = ref<ITable<ISimProvider> | null>(null)

async function onData() {
    data.value = await $fetch<ITable<ISimProvider>>('/api/sims-provider')
}

onMounted(onData)
</script>

<template>
    <SkSelect
        v-if="data"
        v-model="value"
        :items="data"
    />
</template>