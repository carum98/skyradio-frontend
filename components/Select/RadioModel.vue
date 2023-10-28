<script setup lang="ts">
// data
const value = ref<IRadioModel | null>(null)
const data = ref<ITable<IRadioModel> | null>(null)

async function onData() {
    data.value = await $fetch<ITable<IRadioModel>>('/api/radios-model')
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