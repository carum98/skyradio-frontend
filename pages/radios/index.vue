<script setup lang="ts">
useHead({
  title: 'Radios',
})

const per_page = useTablePerPage({ sm: 8, lg: 11 })
</script>

<template>
    <main>
        <TableRadios
            :path="`/api/radios?per_page=${per_page}`"
            enable-create
            enable-table-actions
            hide-stats-button
        ></TableRadios>
    </main>
</template>