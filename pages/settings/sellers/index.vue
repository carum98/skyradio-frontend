<script setup lang="ts">
definePageMeta({
    name: 'sellers'
})

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers')
const { openRemoveInstance } = useRemoveInstance('Vendedor', refresh)

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/sellers/create.vue'),
    props: {
        onCreated(_client: ISeller) {
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
                            path: `/api/sellers/${item.code}`,
                        })
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>