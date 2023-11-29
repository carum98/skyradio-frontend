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
        title: 'Modelo',
        key: 'model',
    },
    {
        title: 'Sim',
        key: 'sim',
    },
    {
        title: 'Proveedor',
        key: 'sim.provider',
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

const routerModal = useRouterModal()

// methods
function openProfile(radio: IRadio) {
    routerModal.push({
        name: 'profile-radio',
        props: {
            code: radio.code
        }
    })
}

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
            <div class="sk-card sk-card--flex-column">
                <div class="d-flex">
                    <SkAvatar 
                        v-if="client"  
                        :alt="client.name"
                        :color="client.color" 
                        class="mr-1"
                    />

                    <h2>{{ client?.name }}</h2>
                </div>

                <p v-if="client?.seller">
                    Vendedor:
                    <NuxtLink
                        :to="{ name: 'sellers-profile', params: { code: client.seller.code } }"
                        class="sk-link"
                    >
                        {{ client.seller.name }}
                    </NuxtLink> 
                </p>

                <p v-if="client?.modality">
                    Modalidad:
                    <SkLinkModal
                        name="profile-modality"
                        :props="{ code: client.modality.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: client.modality.color }"></span>
                        {{ client.modality.name  }}
                    </SkLinkModal>
                </p>

                <SkDropdown 
                    :dividers="[1, 2]"
                    :options="[
                        {
                            key: 'history',
                            ...ActionsStatic.HISTORY,
                            action: () => openClientLogs(client?.code ?? ''),
                        },
                        {
                            key: 'download',
                            ...ActionsStatic.DOWNLOAD,
                            action: () => {},
                        },
                        {
                            key: 'edit',
                            ...ActionsStatic.UPDATE,
                            action: () => onUpdate()
                        },
                        {
                            key: 'remove',
                            ...ActionsStatic.DELETE,
                            action: () => onRemove(client)
                        }
                    ]"
                ></SkDropdown>
            </div>
        </section>
        <SkTable 
            :table="data"
            :columns="columns"
            v-model="search"
            hover
            @onRowClick="openProfile"
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

            <template #cell(model)="{ value }">
                <SkLinkModal
                    v-if="value"
                    name="profile-model"
                    :props="{ code: value.code }"
                    class="sk-link"
                >
                    <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                    {{ value.name }}
                </SkLinkModal>
            </template>

            <template #cell(sim)="{ value }">
                <SkLinkModal
                    v-if="value"
                    name="profile-sim"
                    :props="{ code: value.code }"
                    class="sk-link"
                >
                    {{ value.number  }}
                </SkLinkModal>
            </template>

            <template #cell(sim.provider)="{ value }">
                <SkLinkModal
                    v-if="value"
                    name="profile-provider"
                    :props="{ code: value.code }"
                    class="sk-link"
                >
                    <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                    {{ value.name }}
                </SkLinkModal>
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

<style>
.header-companies-profile {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 25px;
    margin-bottom: 25px;
}
</style>
