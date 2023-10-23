<script setup lang="ts">
const data = ref({})

const response = await useFetch('/api/companies')
data.value = response
</script>

<template>
    <div>
        {{ data }}
    </div>
</template>