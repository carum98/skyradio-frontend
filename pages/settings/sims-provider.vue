<script setup lang="ts">
definePageMeta({
    name: 'sims-provider'
})

const { page, search, data, refresh } = await useTableData<ISimProvider>('/api/sims-provider')
const { openRemoveInstance } = useRemoveInstance('Proveedor', refresh)

const { open: OpenCreate } = useModal({
    component: import('@views/create-provider.vue'),
    listeners: {
        onCreated: () => refresh()
    }
})

const { open: OpenUpdate } = useModal({
    component: import('@views/update-provider.vue'),
    listeners: {
        onUpdated: () => refresh()
    }
})
</script>

<template>
<main>
    <SkTable
        gridView
        :table="data" 
        v-model="search"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="OpenCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell="{ item }">
            {{ item.name }}

            <SkDropdown 
                class="ml-auto"
                :options="[
                    {
                        key: 'delete',
                        label: ActionsStatic.DELETE.name,
                        icon: ActionsStatic.DELETE.icon,
                        color: ActionsStatic.DELETE.color,
                        action: () => openRemoveInstance({ 
                            path: `/api/sims-provider/${item.code}`,
                        })
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => OpenUpdate({ provider: item })
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>