<script setup lang="ts">
// data
const value = ref<ISeller | null>(null)
const data = ref<ITable<ISeller> | null>(null)

async function onData() {
    data.value = await $fetch<ITable<ISeller>>('/api/companies-seller')
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