<script setup lang="ts">
useHead({
  title: 'Apps',
})

const per_page = useTablePerPage({ sm: 8, lg: 11 })
</script>

<template>
    <main>
        <TableApps
            :path="`/api/apps?per_page=${per_page}`"
            enable-table-actions
        ></TableApps>
    </main>
</template>