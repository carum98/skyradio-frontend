<script setup lang="ts">
const { data, pending } = await useFetch<ITable<ICompany>>('/api/companies')
</script>

<template>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @click-row="$router.push({ name: 'companies-profile', params: { code: $event.code } })"
    />
</template>