<script setup lang="ts">
useHead({
  title: 'Radios',
})
</script>

<template>
    <main>
        <TableRadios
            path="/api/radios"
            enable-create
            enable-table-actions
        />
    </main>
</template>