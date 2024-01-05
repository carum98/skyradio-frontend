<script setup lang="ts">
useHead({
  title: 'SIMs',
})
</script>

<template>
    <main>
        <TableSims
            path="/api/sims"
            enable-create
            enable-table-actions
        />
    </main>
</template>