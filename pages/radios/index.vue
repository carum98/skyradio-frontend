<script setup lang="ts">
const { data, pending } = await useFetch<ITable<IRadio>>('/api/radios')
</script>

<template>
    <SkTable 
        v-if="!pending"
        :table="data!"
        @click-row="$router.push({ name: 'radios-profile', params: { code: $event.code } })"
    />
</template>