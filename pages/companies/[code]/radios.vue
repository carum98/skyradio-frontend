<script setup lang="ts">
definePageMeta({
    name: 'companies-radios'
})

const route = useRoute()

const { data, pending } = await useFetch<ITable<IRadio>>(`/api/companies/${route.params.code}/radios`)
</script>

<template>
    <SkTable 
        v-if="!pending"
        :table="data!"
        @click-row="$router.push({ name: 'radios-profile', params: { code: $event.code } })"
    />
</template>