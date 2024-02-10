<script setup lang="ts">
useHead({
  title: 'SIMs',
})

const per_page = useTablePerPage({ sm: 8, lg: 11 })
</script>

<template>
    <main>
        <TableSims
            :path="`/api/sims?per_page=${per_page}`"
            enable-create
            enable-table-actions
        />
    </main>
</template>