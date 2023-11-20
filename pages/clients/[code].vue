<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

definePageMeta({
    name: 'clients-profile'
})

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
    },
    {
        title: '',
        key: 'logs',
        width: 65,
        align: 'center',
    },
    {
        title: '',
        key: 'actions',
        width: 65,
        align: 'center',
    }
]
const route = useRoute()
const router = useRouter()

const code = route.params.code as string

// data
const { data: client, refresh: refreshData } = await useFetch<IClient>(`/api/clients/${code}`)

const { page, data, search, refresh } = await useTableData<IRadio>(`/api/clients/${code}/radios`)

const { open: openClientLogs } = useLogs('clients')
const { open: openRadioLogs } = useLogs('radios')
const { navigateToAction } = useActions(refresh)
const { navigateToAction: navigateToAction2 } = useActions(refreshData)
const { navigateToAction: navigateToAction3 } = useActions(() => router.back())



// methods
function onUpdate() {
    navigateToAction2({
        name: 'update-client',
        props: {
            client: toRaw(client.value)
        }
    })
}

function onRemove(client: IClient | null) {
    navigateToAction3({
        name: 'remove-client',
        props: {
            code: client?.code
        }
    })
}

function openSwap({ client, radio }: { client: IClient | null, radio: IRadio | null }) {
    navigateToAction({
        name: 'swap-radio',
        props: {
            client,
            radio
        }
    })
}

function openRemove({ client, radio }: { client: IClient | null, radio: IRadio | null }) {
    navigateToAction({
        name: 'remove-radio',
        props: {
            client,
            radio
        }
    })
}

function openAdd(client: IClient | null) {
    navigateToAction({
        name: 'add-radios',
        props: {
            client
        }
    })
}
</script>

<template>
    <main>
        <section class="header-companies-profile">
            <div>
                <h2>{{ client?.name }}</h2>
                <p>{{ client?.seller?.name ?? 'Sin vendedor' }}</p>
                <p>{{ client?.modality.name }}</p>

                <button class="sk-button" @click="onUpdate">
                    Editar
                </button>

                <button v-if="client" class="sk-button" @click="openClientLogs(client.code)">
                    Historial
                </button>

                <SkDropdown 
                    :options="[
                        {
                            key: 'remove',
                            name: ActionsStatic.DELETE.name,
                            icon: ActionsStatic.DELETE.icon,
                            color: ActionsStatic.DELETE.color,
                            action: () => onRemove(client)
                        }
                    ]"
                ></SkDropdown>
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
            <template #actions>
                <div class="table-actions">
                    <button 
                        class="button-actions" 
                        :style="{ '--color': ActionsStatic.CHANGE.color }"
                        @click="() => openSwap({ client, radio: null })"
                    >
                        <span v-html="ActionsStatic.CHANGE.icon"></span>
                    </button>
                    <button 
                        class="button-actions" 
                        :style="{ '--color': ActionsStatic.REMOVE.color }"
                        @click="() => openRemove({ client, radio: null })"
                    >
                        <span v-html="ActionsStatic.REMOVE.icon"></span>
                    </button>
                    <button 
                        class="button-actions"
                        :style="{ '--color': ActionsStatic.ADD.color }"
                        @click="() => openAdd(client)"
                    >
                        <span v-html="ActionsStatic.ADD.icon"></span>
                    </button>
                </div>
            </template>

            <template #cell(sim)="{ value }">
                <p>{{ value?.number }}</p>
                <p>{{ value?.provider?.name }}</p>
            </template>

            <template #cell(logs)="{ item }">
                <button class="sk-dropdown__button" @click.stop="openRadioLogs(item.code)">
                    <IconsLogs />
                </button>
            </template>

            <template #cell(actions)="{ item }">
                <ActionsDropdownRadio
                    :radio="item"
                    :refresh="refresh"
                />
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
