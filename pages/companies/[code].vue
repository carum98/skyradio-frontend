<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/companies/${route.params.code}`)
</script>

<template>
    {{ data }}
</template>