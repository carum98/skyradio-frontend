<script setup lang="ts">
const { data } = await useFetch('/api/radios')
</script>

<template>
    <TableBase :data="data['data']" @click-row="$router.push({ name: 'radios-profile', params: { code: $event.code } })" />
</template>