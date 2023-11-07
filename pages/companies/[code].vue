<script setup lang="ts">
definePageMeta({
    name: 'companies-profile'
})

import type { SkTableColumn } from '@components/SkTable/sk-table'

const route = useRoute()

const columns: SkTableColumn[] = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'IMEI',
        key: 'imei',
    },
    {
        title: 'Serial',
        key: 'serial',
    },
    {
        title: 'Modelo',
        key: 'model',
        formatter: (value: IRadioModel | null) => value?.name ?? '-'
    },
    {
        title: 'Sim / Proveedor',
        key: 'sim',
    }
]
const { data: company } = await useFetch<ICompany>(`/api/companies/${route.params.code}`)

const { page, data, search } = await useTableData<IRadio>(`/api/companies/${route.params.code}/radios`)

</script>

<template>
    <main>
        <section class="header-companies-profile">
            <div>
                <h2>{{ company?.name }}</h2>
                <p>{{ company?.seller.name }}</p>
                <p>{{ company?.modality.name }}</p>

                <button class="sk-button">
                    Editar
                </button>

                <button class="sk-button">
                    Historial
                </button>
            </div>
            <div>

            </div>
        </section>
        <SkTable 
            :table="data"
            :columns="columns"
            v-model="search"
            @onPage="page = $event"
        >
            <template #cell(sim)="{ value }">
                <p>{{ value?.number }}</p>
                <p>{{ value?.provider?.name }}</p>
            </template>
        </SkTable>
    </main>
</template>

<style scoped>
.header-companies-profile {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 25px;
    margin-bottom: 25px;

    & > div {
        background-color: var(--table-color);
        padding: 1.5rem;
        border-radius: 15px;
    }
}
</style>
