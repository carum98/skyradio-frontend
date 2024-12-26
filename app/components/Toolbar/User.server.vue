<script setup lang="ts">
 const user = useUser()
</script>

<template>
    <div class="user-info">
        <p class="text-ellipsis">{{ user?.name }}</p>
        <p class="text-ellipsis">{{ user?.email }}</p>
    </div>
</template>