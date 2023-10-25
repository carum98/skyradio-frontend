<script setup lang="ts">
definePageMeta({
    name: 'companies-radios'
})

const route = useRoute()

const { data } = await useFetch(`/api/companies/${route.params.code}/radios`)
</script>

<template>
    <TableBase :data="data['data']" @click-row="$router.push({ name: 'radios-profile', params: { code: $event.code } })" />
</template>