<script setup lang="ts">
 const user = useUser()
</script>

<template>
    <div class="user-info">
        <p>{{ user?.name }}</p>
        <p>{{ user?.email }}</p>
    </div>
</template>