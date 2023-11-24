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
            code: provider.code
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
            <span class="badge-color" :style="{ backgroundColor: item.color }"></span>

            {{ item.name }}

            <SkDropdown 
                class="ml-auto"
                :options="[
                    {
                        key: 'delete',
                        ...ActionsStatic.DELETE,
                        action: () => openRemove(item)
                    },
                    {
                        key: 'edit',
                        ...ActionsStatic.UPDATE,
                        action: () => openUpdate(item)
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>