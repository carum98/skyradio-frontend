<script setup lang="ts">
definePageMeta({
    name: 'radios-profile'
})

const route = useRoute()

const { data } = await useFetch(`/api/radios/${route.params.code}`)
</script>

<template>
    <main>
        {{ data }}
    </main>
</template>