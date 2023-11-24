<script setup lang="ts">
definePageMeta({
    name: 'sellers-profile'
})

const route = useRoute()

const { data } = await useFetch(`/api/sellers/${route.params.code}`)
</script>

<template>
    <main>
        {{ data }}
    </main>
</template>