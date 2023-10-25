<script setup lang="ts">
const { data } = await useFetch('/api/companies')
</script>

<template>
    <TableBase :data="data['data']" @click-row="$router.push({ name: 'companies-profile', params: { code: $event.code } })" />
</template>