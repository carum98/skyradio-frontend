<script setup lang="ts">
definePageMeta({
    name: 'sims-provider'
})

const { page, search, data, refresh } = await useTableData<ISimProvider>('/api/sims-provider')
const { navigateToAction } = useActions(refresh)

// methods
function openCreate() {
    navigateToAction({
        name: 'create-provider',
    })
}

function openUpdate(provider: IRadioStatus) {
    navigateToAction({
        name: 'update-provider',
        props: {
            provider
        }
    })
}

function openRemove(provider: IRadioStatus) {
    navigateToAction({
        name: 'remove-provider',
        props: {
            path: `/api/sims-provider/${provider.code}`,
        }
    })
}
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
            <button class="add-button" @click="openCreate">
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
                        action: () => openUpdate(item)
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => openUpdate(item)
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>