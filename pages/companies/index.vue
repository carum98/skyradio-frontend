<script setup lang="ts">
const { page, search, data, refresh } = await useTableData<ICompany>('/api/companies')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/companies/create.vue'),
    props: {
        onCreated(_company: ICompany) {
            refresh()
            close()
        }
    }
})

function openProfile(company: ICompany) {
    navigateTo({
        name: 'companies-profile',
        params: {
            code: company.code
        }
    })
}
</script>

<template>
<main>
    <SkTable
        :table="data!" 
        v-model="search"
        @click-row="openProfile"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="OpenCreate">
                <IconsAdd />
            </button>
        </template>
    </SkTable>
</main>
</template>