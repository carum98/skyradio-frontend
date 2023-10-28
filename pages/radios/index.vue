<script setup lang="ts">
const { page, data, pending, search } = await useTableData<IRadio>('/api/radios')
</script>

<template>
    <h1>Radios</h1>
    <input v-model="search" type="search" />
    <SkTable 
        v-if="!pending"
        :table="data!"
        @click-row="$router.push({ name: 'radios-profile', params: { code: $event.code } })"
        @onPage="page = $event"
    />
</template>