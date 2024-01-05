<script setup lang="ts">
useHead({
  title: 'Clientes',
})
</script>

<template>
    <main>
        <TableClients 
            path="/api/clients"
            enable-create
            enable-table-actions
        />
    </main>
</template>