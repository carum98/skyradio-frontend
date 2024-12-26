<script setup lang="ts">
useHead({
  title: 'Clientes',
})

const per_page = useTablePerPage({ sm: 7, lg: 10 })
</script>

<template>
    <main>
        <TableClients 
            :path="`/api/clients?per_page=${per_page}`"
            enable-create
            enable-table-actions
        />
    </main>
</template>