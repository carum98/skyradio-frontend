<script setup lang="ts">
const { data } = await useFetch('/api/companies')
</script>

<template>
    <TableBase :data="data['data']" @click-row="$router.push({ path: `/companies/${$event.code}` })" />
</template>