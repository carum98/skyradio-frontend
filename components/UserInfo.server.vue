<script setup lang="ts">
 const user = useUser()
</script>

<template>
    <div class="user-info">
        {{ user?.name }}
    </div>
</template>