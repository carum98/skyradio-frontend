<script setup lang="ts">
function logout() {
    useFetch(`/api/logout`, {
        method: 'POST'
    })
}
</script>

<template>
    <div class="toolbar">
        <ToolbarAppearance />
        <ToolbarUser />
        <SkDropdown
            :options="[{
                key: 'logout',
                name: 'Cerrar sesión',
                icon: `<svg width='18' height='18' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'><path d='M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2'/><path d='M9 12h12l-3-3m0 6l3-3'/></g></svg>`,
                color: 'red',
                action: logout
            }]">
            <template #icon>
                <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m11.3 14.3l-2.6-2.6q-.475-.475-.212-1.087T9.425 10h5.15q.675 0 .938.613T15.3 11.7l-2.6 2.6q-.15.15-.325.225T12 14.6q-.2 0-.375-.075T11.3 14.3Z"/></svg>
            </template>
        </SkDropdown>
    </div>
</template>