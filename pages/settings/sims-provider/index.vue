<script setup lang="ts">
definePageMeta({
    name: 'sims-provider'
})

const { page, search, data, refresh } = await useTableData<ISimProvider>('/api/sims-provider')
const { openRemoveInstance } = useRemoveInstance('Proveedor', refresh)

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/sims-provider/create.vue'),
    props: {
        onCreated(_client: ISimProvider) {
            refresh()
            close()
        }
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
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>