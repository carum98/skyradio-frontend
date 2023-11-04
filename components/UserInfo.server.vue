<script setup lang="ts">
const { data } = await useFetch<IUser>(`/api/user`)
</script>

<template>
    <div class="user-info">
        {{ data?.name }}
    </div>
</template>