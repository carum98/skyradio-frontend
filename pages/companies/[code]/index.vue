<script setup lang="ts">
definePageMeta({
    name: 'companies-profile'
})

const route = useRoute()

const { data } = await useFetch(`/api/companies/${route.params.code}`)
</script>

<template>
    {{ data }}
    <NuxtLink :to="{ name: 'companies-radios', params: { code: $route.params.code } }">Radios</NuxtLink>
</template>